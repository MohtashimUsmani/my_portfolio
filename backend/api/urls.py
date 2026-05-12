from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("portfolio/", views.PortfolioView.as_view(), name="portfolio"),
    path("hero/", views.HeroView.as_view(), name="hero"),
    path("about/", views.AboutView.as_view(), name="about"),
    path("skills/", views.SkillListView.as_view(), name="skills"),
    path("projects/", views.ProjectListView.as_view(), name="projects"),
    path("projects/<int:pk>/", views.ProjectDetailView.as_view(), name="project-detail"),
    path("services/", views.ServiceListView.as_view(), name="services"),
    path("socials/", views.SocialLinkListView.as_view(), name="socials"),
    path("contact/", views.ContactMessageCreateView.as_view(), name="contact"),
]

