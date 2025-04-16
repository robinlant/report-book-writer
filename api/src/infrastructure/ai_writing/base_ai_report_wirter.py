from .entities import ReportEntity, UsageEntity


class BaseAiReportWriter:
    async def write_report(self, report_entity: ReportEntity) -> tuple[ReportEntity, UsageEntity]:
        raise NotImplementedError()