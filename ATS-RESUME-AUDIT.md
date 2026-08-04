# Resume ATS & HR Audit — Amit Sehgal

> Expert review: ATS optimization + what hiring managers actually scan for.

---

## 1. PROFESSIONAL SUMMARY

Your current summary is strong but dense. Recruiters spend ~6 seconds on first scan.

**Q1:** What is the ONE role you're targeting next? (e.g., Staff Data Engineer, Lead Data Platform Engineer, Data Architect?) This determines which keywords lead. --> Senior data engineer/ Lead data engineer

**Q2:** What's the strongest single number in your career? Pick one — `180 daily jobs`, `40% query reduction`, `5 banking entities`, `100 GB/day`, `15 hrs/week saved`. We lead with it. -- > Saved man hours

**Q3:** Any industry preference? (Fintech/banking seems your lane — lean into it or stay broad?). --> Retail/ Fintech banking

**Q4:** Do you want to position as "builder" (hands-on IC) or "architect" (design + lead)? The summary tone shifts completely based on this. --> Hands on IC, but now with my experice i want to lean toweards lead

---

## 2. WORK EXPERIENCE — Emirates NBD (Jan 2025 – Present)

This is your CURRENT role — it carries the most weight. Recruiters scan this first.

**Q5:** The `~180 daily jobs` — what were these jobs doing? Data loads? Transformations? Reports? Being specific makes this much stronger. --> The number is now 250, These are the Batch jobs we have deployed as a team which supports Dealmanager application and powerbi/ ssrs reports, also these are jobs under The hana decomission project where we migrated data from SAP hana to hadoop hive.

**Q6:** "Significant business cost savings" — any ballpark? Even a range (e.g., "mid-six-figures annually") or a percentage is 10x better than "significant." --> estimated 200M AED every year

**Q7:** The YAML-driven PySpark framework — how many ETL jobs were replicated using it? How many engineers used it? This shows scale of impact. about 300 batch jobs

**Q8:** You mention 5 banking entities for SAP HANA migration. Which entities? (Retail, Corporate, Islamic, etc.) — adds credibility.ENTITES in ENBD is UAE, Emirates Islamic, India, SGP, EGY, LON, KSA. 

**Q9:** Any stakeholder interaction? Do you work directly with business heads, product owners, or purely within engineering? --> I work closery with PO and sometimes with business heads to understand requirements as shadow of my lead.

---

## 3. WORK EXPERIENCE — EPAM / Canadian Tire (Dec 2021 – Jan 2025)

**Q10:** "100 GB of daily data" — what kind of data? Customer transactions? Inventory? IoT? Loyalty? This paints the picture. This is inventory, product specification data which was used my ML model to design aisle in retail store. The transaction was also into the picture which gave sense of fast selling produts. This was given to an application which store owners can use to get suggested produts on aisle or pegboards, over it then can customize. We also had same use case for subsideries of canadian tier namely sport check, marks, party city. 

**Q11:** The analytical web application for dealers — how many dealers used it? What did it do for them? Business outcome matters. we had 500 stores and each stores had and owner and under him 2/3 dealers who had access to the application.

**Q12:** 40% query reduction — from what to what? (e.g., "from 5 seconds to 3 seconds" or "from 2 minutes to 72 seconds"). Specifics beat percentages alone. In performance phase, query optimization reduced the query runtime and we could deliver the daily timeframe data early. i.e 6 am

**Q13:** Cosmos DB JSON schema design — how many collections/tables? What was the data volume in Cosmos DB? Was this multi-region? Dont remember

---

## 4. WORK EXPERIENCE — ABB Global (Feb 2020 – Dec 2021)

**Q14:** IoT telemetry — what kind of devices? How many devices? Data points per second? Industrial IoT scale numbers are impressive. These were machines deployed in factories/ ships/ ocean which collected vibration data, temprature data, etc and we had anomly detection engine on top of it running which was trained to detect wear and tear and suggest replcaement of the service part to avoid breakdowns. We had agg data coming to azure cloud and edge servers which collected individual sensor data locally without the internet. 

**Q15:** ML models on unstructured data — what kind of predictions? (Anomaly detection? Predictive maintenance? Classification?) What business problem did it solve? anaomy detection based on images of converyr belts and other moving parts for predective maintainance

**Q16:** "15 hours of manual effort per week" — for how many engineers? One person? A team of 5? Scale matters. My role was to automate a lot of script writing, for which i wrote crud with flask api. also a lot of automation in building pipeline using pyspark framework for streaming data. 

**Q17:** The Python CRUD APIs — what systems did they connect? Was this an internal platform used across the org? Local edge used these python APIs to insert to local mongo db. 

---

## 5. WORK EXPERIENCE — Infosys (Mar 2017 – Feb 2020)

First job — hiring managers look for growth trajectory here.

**Q18:** Clients PwC and Exelon — were these simultaneous or sequential? How big were the teams you worked with? 2 years and 1 year. Team was 9 and 4 respectively.

**Q19:** "Data warehouse schema design" — what kind of warehouse? Star schema? Snowflake? What was the data domain (finance, audit, energy)? snowflake shema, and Master data management for PWC and engergy for Excelon

**Q20:** Selenium API testing — how many APIs? What was the test coverage improvement? Any CI/CD integration? Dont remeber

---

## 6. CERTIFICATIONS

You list Azure Developer Associate and Azure IoT Developer Specialty.

**Q21:** Are these still active? Expiration dates matter for ATS filters. I have only mentioned the active ones, other wise i have total 7 certification. 

**Q22:** Any other certs in progress? Databricks certification would be a strong add given your experience. Have you considered: Databricks Data Engineer Associate, Apache Spark Developer, or Kafka Confluent cert? I am planning databricks again, old got expired. 

**Q23:** Do you have any internal/hands-on certs not listed? (e.g., internal ABB training, Infosys campus certifications?) i have done many course on linkedin if possible check on my linkied url

---

## 7. SKILLS

**Q24:** Your PySpark is clearly advanced — any specific Spark optimizations you're particularly good at? (AQE, dynamic partition pruning, skew handling, broadcast joins, Delta optimization?) Resource allocation, partitioning, skew handelling

**Q25:** GenAI/LLM Pipelines — this is a HOT keyword right now. Can you be more specific? "Built LLM-powered data pipelines using Claude Code for automated schema inference and anomaly detection" — is this accurate? What exactly did Claude Code do in your workflow? no not accurate, we have a new framework in ENBD where we have built skills and md files which understands individual etl requirements and create scripts with logic and we run skills for sonar compliance, optimization, git deployment and then CICD take cares for packaging. 

**Q26:** Any DevOps/Infra skills not listed? Terraform, Docker, CI/CD (Azure DevOps/GitHub Actions)? all except github actions. also helm and kubernetes. This was with ABB

**Q27:** Any data modeling skills? (Kimball, Inmon, Data Vault, dimensional modeling?) Dimensional modelling

---

## 8. EDUCATION

**Q28:** Any notable academic achievements? (Dean's list, top percentile, relevant thesis/project?) NO

**Q29:** Any continuing education? Online courses, workshops, conferences? (Shows continuous learning.) Linkedin learning and personal github activty. I have created games for learning llm framework deployment. available at https://amitsehgal29.github.io/games

---

## 9. EXTRACURRICULAR / ADDITIONAL

**Q30:** The Vasai Corona Resources project is great — 5,000 DAU is impressive. Any metrics on uptime, response time, or tech choices beyond Flask? Did you use any cloud infra? I used standalone linux machine on aws where i connected DNS and opened firewall for INBOUND.

**Q31:** Any open-source contributions, tech blogs, conference talks, or Stack Overflow activity? Medium.com couple of blogs

**Q32:** Any mentoring, team leading, or interviewing experience? This signals seniority. I shadow my lead, and i lead the project from DE side in Epam. but we were just 3 resources. It was unsaid lead

**Q33:** Languages spoken? (Dubai-based — Arabic, Hindi, English? Multilingual is a plus.) Hindi and english

**Q34:** Any notice period or visa status that recruiters need to know? (Standard UAE question.) currently on work visa.

---

## 10. ROLE TARGETING

**Q35:** What's your ideal next role title? We'll reverse-engineer the entire resume to match those job descriptions. Senior or lead data engineer

**Q36:** Target geography? Dubai only, or open to UAE-wide, remote, Saudi, Europe? dubai and auh

**Q37:** Target industry? Fintech/Banking (your strongest lane), or open to any? I want to target product company like salesforces, ABB which gives good money and good perks. Otherwise finance

---

*Answer whatever you can — skip what doesn't apply. Once we have the answers, I'll rebuild every section with ATS-optimized bullet points and update the website.*
