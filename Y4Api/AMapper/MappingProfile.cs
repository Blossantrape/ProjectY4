using AutoMapper;
using Y4Api.Model;

namespace Y4Api.AMapper;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Student, StudentResponse>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => $"{src.Name} {src.Name}"))
            .ForMember(dest => dest.Address, opt => opt.MapFrom(src => $"{src.Name} {src.Name}"))
            .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => $"{src.PhoneNumber} {src.PhoneNumber}"))
            .ForMember(dest => dest.Email, opt => opt.MapFrom(src => $"{src.Email} {src.Email}"));
    }
}