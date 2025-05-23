import json
from urllib.request import Request
from loguru import logger
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.src.api import WriteReportRequestDto, WriteReportResponseDto
from api.src.infrastructure import GrokAiWriter, ReportGenerationError
app = FastAPI()

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    try:
        body_json = await request.json()
        body_json["api_token"] = "deleted"
        logger.info(f"Request body: {body_json}")
    except Exception:
        logger.warning("Failed to decode request body")


    return await call_next(request)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/write")
async def write_report(write_request_dto: WriteReportRequestDto) -> WriteReportResponseDto:
    try:
        grok_ai = GrokAiWriter(
            api_key=write_request_dto.api_token,
            max_line_len=write_request_dto.max_line_len,
            randomness=write_request_dto.randomness
        )

        generated_report_entity, usage_entity = grok_ai.write_report(write_request_dto.report)

        return WriteReportResponseDto(is_error=False, report=generated_report_entity, usage=usage_entity)
    except ReportGenerationError as e:
        return WriteReportResponseDto(is_error=True, error_msg=e.msg)
