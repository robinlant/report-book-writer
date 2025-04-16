from src.infrastructure import GrokAiWriter, ReportEntity

if __name__ == '__main__':
    data = {
        'api_key': 'xai-LF7BPkuEbi2XECNUJcOjuS4VrjDn2INim39Jp5eroV6ZBDRPEMyC1z6BS14VtbT3ibHfh9KzKivR5eOq',
        'randomness': 60
    }
    gaw = GrokAiWriter(**data)

    report = ReportEntity(
        specialization="Fachinformatiker DatenundProcessAnalyze",
        is_school_week=False,
        week_days=[
            ["was in ai workshop"],
            ["напиши тут что я что то с пайтоном делал типа учил что то в нем"],
            ["helpe collegues an ipad zu reparieren", "wrtten unittest for my test app"],
            ["debugged python app", "wrtten unittest for my test app"],
            ["wrtten unittest for my test app"]
        ]
    )
    text, usage = gaw.write_report(report)
    print(text.model_dump_json(indent=2))
    print("-"*30+"\n\n"+usage.model_dump_json(indent=2))