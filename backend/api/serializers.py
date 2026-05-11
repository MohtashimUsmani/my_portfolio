from rest_framework import serializers
from .models import Hero, About, Skill, Tag, Project, Service, SocialLink, ContactMessage


class HeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hero
        fields = [
            "id",
            "status_badge",
            "first_name",
            "last_name",
            "role_tagline",
            "description",
            "cta_primary_label",
            "cta_primary_url",
            "cta_secondary_label",
            "cta_secondary_url",
        ]


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = About
        fields = [
            "id",
            "heading",
            "full_name",
            "paragraph_one",
            "paragraph_two",
            "years_experience",
            "projects_shipped",
            "models_deployed",
            "fun_stat_label",
        ]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "level", "category", "position"]


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]


class ProjectSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    display_number = serializers.ReadOnlyField()

    class Meta:
        model = Project
        fields = [
            "id",
            "display_number",
            "title",
            "description",
            "status",
            "accent_color",
            "github_url",
            "live_url",
            "tags",
            "position",
            "is_featured",
        ]


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ["id", "icon", "title", "description", "position"]


class SocialLinkSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source="get_platform_display", read_only=True)

    class Meta:
        model = SocialLink
        fields = ["id", "platform", "platform_display", "url", "label", "position"]


class ContactMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["name", "email", "message"]

