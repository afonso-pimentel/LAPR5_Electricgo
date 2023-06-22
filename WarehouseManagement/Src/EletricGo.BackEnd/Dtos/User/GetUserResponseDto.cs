namespace EletricGo.BackEnd.Dtos.User
{
    public class GetUserResponseDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
    }
}
