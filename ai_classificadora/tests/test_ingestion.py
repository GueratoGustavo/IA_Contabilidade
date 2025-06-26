import pytest
import pandas as pd
from unittest.mock import patch
from ai_classificadora.ingestion.loader import DataLoader


def test_load_csv_success():
    mock_path = "data/raw/sample.csv"
    with patch("pandas.read_csv") as mock_read_csv:
        mock_df = pd.DataFrame({"col1": [1, 2], "col2": [3, 4]})
        mock_read_csv.return_value = mock_df

        loader = DataLoader()
        df = loader.load_csv(mock_path)

        mock_read_csv.assert_called_once_with(mock_path)
        assert not df.empty
        assert list(df.columns) == ["col1", "col2"]
