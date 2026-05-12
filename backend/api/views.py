from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from django.http import JsonResponse
from .models import Hero, About, Skill, Project, Service, SocialLink
from .serializers import (
    HeroSerializer,
    AboutSerializer,
    SkillSerializer,
    ProjectSerializer,
    ServiceSerializer,
    SocialLinkSerializer,
    ContactMessageCreateSerializer,
)

def home(request):
    return JsonResponse(
        {
            "message": "Portfolio API is running.",
            "endpoints": [
                "/api/portfolio/",
                "/api/hero/",
                "/api/about/",
                "/api/skills/",
                "/api/projects/",
                "/api/services/",
                "/api/socials/",
                "/api/contact/",
            ],
        }
    )

class PortfolioView(APIView):
    """Return all active portfolio data in one response."""

    def get(self, request):
        hero = Hero.objects.filter(is_active=True).first()
        about = About.objects.filter(is_active=True).first()

        data = {
            "hero": HeroSerializer(hero).data if hero else None,
            "about": AboutSerializer(about).data if about else None,
            "skills": SkillSerializer(Skill.objects.filter(is_active=True), many=True).data,
            "projects": ProjectSerializer(
                Project.objects.filter(is_active=True).prefetch_related("tags"),
                many=True,
            ).data,
            "services": ServiceSerializer(Service.objects.filter(is_active=True), many=True).data,
            "socials": SocialLinkSerializer(SocialLink.objects.filter(is_active=True), many=True).data,
        }
        return Response(data)


class HeroView(APIView):
    def get(self, request):
        hero = Hero.objects.filter(is_active=True).first()
        if not hero:
            return Response({"detail": "No active hero found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(HeroSerializer(hero).data)


class AboutView(APIView):
    def get(self, request):
        about = About.objects.filter(is_active=True).first()
        if not about:
            return Response({"detail": "No active about section found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(AboutSerializer(about).data)


class SkillListView(APIView):
    def get(self, request):
        qs = Skill.objects.filter(is_active=True)
        category = request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return Response(SkillSerializer(qs, many=True).data)


class ProjectListView(APIView):
    def get(self, request):
        qs = Project.objects.filter(is_active=True).prefetch_related("tags")
        if request.query_params.get("featured") == "true":
            qs = qs.filter(is_featured=True)
        return Response(ProjectSerializer(qs, many=True).data)


class ProjectDetailView(APIView):
    def get(self, request, pk):
        try:
            project = Project.objects.prefetch_related("tags").get(pk=pk, is_active=True)
        except Project.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(ProjectSerializer(project).data)


class ServiceListView(APIView):
    def get(self, request):
        qs = Service.objects.filter(is_active=True)
        return Response(ServiceSerializer(qs, many=True).data)


class SocialLinkListView(APIView):
    def get(self, request):
        qs = SocialLink.objects.filter(is_active=True)
        return Response(SocialLinkSerializer(qs, many=True).data)


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": "Message received. Thanks for reaching out!"},
            status=status.HTTP_201_CREATED,
        )
