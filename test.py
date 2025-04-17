import pandas as pd
df = pd.read_excel("D:\ChatWithLLM\data\Copy of merged(1).xlsx")
print(df.columns.tolist())  # This will show all column names in your DataFrame
print(df.head())  # This will show the first few rows of your data