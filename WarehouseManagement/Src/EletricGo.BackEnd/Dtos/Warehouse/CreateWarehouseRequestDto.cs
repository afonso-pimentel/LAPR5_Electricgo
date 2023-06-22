namespace EletricGo.BackEnd.Dtos.Warehouse
{
    public class CreateWarehouseRequestDto
    {
        public string StreetName { get; set; }
        public string Number { get; set; }
        public string ZipCode { get; set; }
        public string Locality { get; set; }
        public decimal Latitude { get; init; }
        public decimal Longitude { get; init; }
        public int Altitude { get; init; }
        public string Designation { get; set; }
        public string WarehouseCode { get; set; }

    }
}
