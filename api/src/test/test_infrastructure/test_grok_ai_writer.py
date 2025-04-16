import json
from typing import Any

import pytest
import requests

from src.infrastructure import GrokAiWriter, ReportEntity


class MockResponse:
    def __init__(self, status_code: int, text: str):
        self.status_code = status_code
        self.text = text

    def raise_for_status(self):
        if not self.status_code >= 400:
            pass

@pytest.fixture(params=[-1000,-1, 101, 1000])
def wrong_randomness(request):
    return request.param

@pytest.fixture
def report_entity() -> ReportEntity:
    return ReportEntity(
        specialization="Fachinformatiker Anwendungsenwicklung",
        is_school_week=False,
        week_days=[
            ["was in ai workshop"],
            [],
            ["helpe collegues an ipad zu reparieren", "wrtten unittest for my test app"],
            ["debugged python app", "wrtten unittest for my test app"],
            ["wrtten unittest for my test app"]
        ]
    )

@pytest.fixture
def success_response_object(report_entity: ReportEntity) -> Any:
    return {
        'usage': {
            'prompt_tokens': 10,
            'completion_tokens': 10
        },
        'model': 'grok',
        'choices': [
            {
                'message': {
                    'content': json.dumps(report_entity.week_days)
                }
            }
        ]
    }

def test_grok_ai_writer_wrong_key_raises_exception():
    with pytest.raises(ValueError):
        GrokAiWriter(api_key="not-xai-key")

def test_grok_ai_writer_wrong_randomness_raises_exception(wrong_randomness):
    with pytest.raises(ValueError):
        GrokAiWriter(api_key='xai-key', randomness=wrong_randomness)

def test_write_response_returns_report_usage(monkeypatch, success_response_object, report_entity):
    # Arrange

    def mock_post(*args, **kwargs):
        return MockResponse(
            status_code=200,
            text=json.dumps(success_response_object)
        )

    monkeypatch.setattr(requests, 'post', mock_post)

    # Act
    grok_ai_writer = GrokAiWriter(api_key='xai-key')
    report, usage = grok_ai_writer.write_report(report_entity=report_entity)

    # Assert
    assert usage.completion_tokens == success_response_object['usage']['completion_tokens']
    assert usage.prompt_tokens == success_response_object['usage']['prompt_tokens']
    assert usage.model == success_response_object['model']

    assert report_entity == report