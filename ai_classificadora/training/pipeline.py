import pandas as pd
from sklearn.model_selection import train_test_split


def prepare_data(df: pd.DataFrame, target_col: str):
    X = df.drop(columns=[target_col])
    y = df[target_col]
    return train_test_split(X, y, test_size=0.2, random_state=42)
