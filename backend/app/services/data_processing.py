def load_csv(file_path):
    import pandas as pd
    try:
        data = pd.read_csv(file_path)
        return data
    except Exception as e:
        raise ValueError(f"Error loading CSV file: {e}")

def calculate_summary_statistics(data):
    summary = {
        'mean': data.mean().to_dict(),
        'median': data.median().to_dict(),
        'variance': data.var().to_dict()
    }
    return summary

def generate_histogram_data(data, column_name, bins=10):
    histogram_data = data[column_name].value_counts(bins=bins).sort_index()
    return histogram_data.to_dict()