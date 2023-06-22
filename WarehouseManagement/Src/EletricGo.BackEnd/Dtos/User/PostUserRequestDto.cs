namespace EletricGo.BackEnd.Dtos.User;

public class PostUserRequestDto
{
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public int Role { get; set; }
}