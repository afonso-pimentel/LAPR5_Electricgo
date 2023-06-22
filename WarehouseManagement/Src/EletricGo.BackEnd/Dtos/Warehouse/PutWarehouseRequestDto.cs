namespace EletricGo.BackEnd.Dtos.Warehouse;

public class PutWarehouseRequestDto
{
    public string StreetName { get; set; }
    public string Number { get; set; }
    public string ZipCode { get; set; }
    public string Locality { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public int Altitude { get; set; }
    public string Designation { get; set; }
}
