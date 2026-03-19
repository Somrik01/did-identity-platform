from pymongo import MongoClient
import pandas as pd
from sklearn.ensemble import IsolationForest

# connect MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["did_project"]
logs = db["logs"]

data = list(logs.find())

if len(data) == 0:
    print("No logs found")
    exit()

df = pd.DataFrame(data)

# convert result to numeric
df["result_code"] = df["result"].apply(lambda x: 1 if x=="success" else 0)

features = df[["result_code"]]

model = IsolationForest(contamination=0.2)

model.fit(features)

df["anomaly"] = model.predict(features)

print(df[["credentialId","result","anomaly"]])