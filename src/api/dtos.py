from pydantic import constr, conint, BaseModel

from src.infrastructure import ReportEntity, UsageEntity

class WriteReportRequestDto(BaseModel):
    api_token: constr(pattern=r"^xai-[\s\S]*$")
    randomness: conint(ge=0, le=100) = 65
    max_line_len: conint(gt=50, lt=250) = 80
    report: ReportEntity

class WriteReportResponseDto(BaseModel):
    is_error: bool
    error_msg: str | None = None
    usage: UsageEntity | None = None
    report: ReportEntity | None = None
