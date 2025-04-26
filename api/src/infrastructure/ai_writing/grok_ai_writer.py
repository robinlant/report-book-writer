import json

import requests
from requests.exceptions import RequestException
from loguru import logger

from .entities import ReportEntity, UsageEntity
from .base_ai_report_wirter import BaseAiReportWriter
from .ai_writing_exceptions import ReportGenerationError

WRONG_RESPONSE_FORMAT_ERR = "Unexpected Grok XAI answer format. Please try again later"
UNEXPECTED_ERR = "Unexpected error. Please try again later"
REQUEST_EXCEPTION_ERR = "Error connecting to Grok API. Please try again later"
GROK_SERVER_ERR = "Grok XAI Server error. Please try again later"
GROK_RATE_LIMIT_ERR = "Too many requests. Please try again later"
WRONG_API_KEY_ERR = "Not valid Grok API key. Please check your key."

class GrokAiWriter(BaseAiReportWriter):
    def __init__(self, api_key: str, randomness: int = 65, max_line_len: int = 80):
        if not api_key.startswith("xai-"):
            raise ValueError('Grok api key has to start with "xai-"')
        if randomness < 0 or randomness > 100:
            raise ValueError('Ai model randomness must be between 0 and 100')
        if max_line_len < 50 or max_line_len > 250:
            raise ValueError('Max_line_len must be between 50 and 1000')

        self.temperature = randomness / 50
        self.max_line_len = max_line_len
        self.base_url = 'https://api.x.ai/v1/chat/completions'
        self.headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key.strip()}'
        }

    def write_report(self, report_entity: ReportEntity) -> tuple[ReportEntity, UsageEntity]:
        messages = [
            {
                'role': 'system',
                'content': (
                    f"Du bist ein Assistent für ein Berichtsheft in der Ausbildung, Fachrichtung {report_entity.specialization}. "
                    f"Du erhältst eine JSON-Struktur mit 5 Listen, jede Liste repräsentiert einen Arbeitstag (Montag bis Freitag) "
                    f"mit 0 bis 5 Einträgen. Die Einträge können in jeder Sprache sein und enthalten oft Fehler. "
                    f"Deine Aufgabe ist es, die Einträge professionell auf Deutsch zu verbessern: korrigiere Grammatik, Rechtschreibung "
                    f"und Stil, mache sie kurz und präzise. Jeder verbesserte Eintrag darf maximal {self.max_line_len} Zeichen lang sein. "
                    f"Behalte die Anzahl der Einträge pro Tag bei und bewahre die ursprüngliche Bedeutung. "
                    f"Antworte ausschließlich mit einem JSON-String, der ein Array mit genau 5 Listen enthält, entsprechend den 5 Tagen. "
                    f"Der JSON-String darf kein Objekt wie {{'days': [...]}} sein, sondern nur ein bare Array, z. B. '[ [\"Eintrag\"], [], [], [], [] ]'. "
                    f"Do not include any additional keys or wrap the array in an object. "
                    f"Beispiel: Für Eingabe [['task'], [], [], [], []] antwortest du mit '[ [\"Verbesserter Eintrag\"], [], [], [], [] ]'."
                )
            },
            {
                'role': 'user',
                'content': json.dumps(report_entity.week_days, ensure_ascii=False)
            }
        ]

        try:
            response = self._make_request(messages=messages, temperature=self.temperature)
            self._check_http_codes(response)
            return self._process_write_report_response(response, report_entity)

        except RequestException as e:
            logger.error(f'Grok API request failed with error: {e}')
            raise ReportGenerationError(REQUEST_EXCEPTION_ERR, errors=e)
        except ReportGenerationError:
            raise # re-raise exception, so general except doesnt catch ReportGenerationError
        except Exception as e:
            logger.error(f'Grok API unexpected error: {e}')
            raise ReportGenerationError(UNEXPECTED_ERR, errors=e)

    def _check_http_codes(self, response: requests.Response) -> None:
        try:
            response.raise_for_status()
        except requests.HTTPError as e:
            logger.error(str(e))
            match response.status_code:
                case 401:
                    raise ReportGenerationError(WRONG_API_KEY_ERR)
                case 429:
                    raise ReportGenerationError(GROK_RATE_LIMIT_ERR)
                case 500:
                    raise ReportGenerationError(GROK_SERVER_ERR)

            logger.error(f'Grok API {response.status_code} status code')
            raise ReportGenerationError(UNEXPECTED_ERR, errors=e)

    def _process_write_report_response(self, response: requests.Response, report_entity: ReportEntity) -> tuple[ReportEntity, UsageEntity]:
            try:
                result_json = json.loads(response.text)

                content = json.loads(result_json['choices'][0]['message']['content'])
                improved_report_entity = ReportEntity(
                    week_days=content,
                    is_school_week=report_entity.is_school_week,
                    specialization=report_entity.specialization
                )

                usage_entity = UsageEntity(
                    model=result_json['model'],
                    prompt_tokens=result_json['usage']['prompt_tokens'],
                    completion_tokens=result_json['usage']['completion_tokens']
                )

                return improved_report_entity, usage_entity
            except Exception as e:
                logger.error(f'Grok API unexpected formatting error: {e}, response: {response.text}, request: {report_entity.model_dump_json()}')
                raise ReportGenerationError(WRONG_RESPONSE_FORMAT_ERR, errors=e)

    def _make_request(self, messages: list[dict[str, str]], temperature: float):
        if temperature < 0 or temperature > 2:
            raise ValueError('Temperature must be between 0 and 2')

        payload = {
            'model': 'grok-3-beta',
            'stream': False,
            'temperature': temperature,
            'messages': messages
        }
        payload = json.dumps(payload)

        return requests.post(
            url=self.base_url,
            headers=self.headers,
            data=payload
        )
