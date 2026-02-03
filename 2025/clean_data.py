import csv


def process_tide_data(input_file, output_file):
    with open(input_file, 'r') as file:
        lines = file.readlines()

    data = []

    for line in lines:
        line = line.strip()

        if line and '/' in line and ':' in line:
            parts = line.split()
            if len(parts) >= 3:
                date = parts[0]
                time = parts[1]
                height = parts[2]
                data.append([date, time, height])

    with open(output_file, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)
        csv_writer.writerow(["date", "time", "height"])
        csv_writer.writerows(data)

    print(f"Data processed and saved to {output_file}")


"""
Read tidal .txt data and save into .csv file
"""
process_tide_data("Brancaster_HW_2025_BST_1dp.txt", "../tidal_data/2025_tides.csv")
process_tide_data("Brancaster_HW_2026_BST_1_dp.txt", "../tidal_data/2026_tides.csv")
