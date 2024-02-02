namespace Ang_test
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
    public class ProductRes
    {
        public string ProductId { get; set; }

        public string Name { get; set; }

        public string ProductGroup { get; set; }

        public string SupGroup { get; set; }
        public string Status { get; set; }
        public string Qty { get; set; }
    }
    public class ProductUpdateModel
    {
        public string Status { get; set; }
        public string ProductId { get; set; }
    }
}
