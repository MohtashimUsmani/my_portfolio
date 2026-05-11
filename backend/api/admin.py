from django.contrib import admin
from django.utils.html import format_html
from .models import Hero, About, Skill, Tag, Project, Service, SocialLink, ContactMessage


@admin.register(Hero)
class HeroAdmin(admin.ModelAdmin):
    list_display = ("__str__", "status_badge", "is_active")
    list_editable = ("is_active",)
    fieldsets = (
        (
            "Identity",
            {
                "fields": ("first_name", "last_name", "role_tagline", "status_badge"),
            },
        ),
        ("Content", {"fields": ("description",)}),
        (
            "Call-to-Action Buttons",
            {
                "fields": (
                    ("cta_primary_label", "cta_primary_url"),
                    ("cta_secondary_label", "cta_secondary_url"),
                )
            },
        ),
        ("Visibility", {"fields": ("is_active",)}),
    )


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "years_experience",
        "projects_shipped",
        "models_deployed",
        "is_active",
    )
    list_editable = ("is_active",)
    fieldsets = (
        ("Section Heading", {"fields": ("heading", "full_name")}),
        ("Body Copy", {"fields": ("paragraph_one", "paragraph_two")}),
        (
            "Stats Block",
            {
                "fields": (
                    ("years_experience", "projects_shipped"),
                    ("models_deployed", "fun_stat_label"),
                )
            },
        ),
        ("Visibility", {"fields": ("is_active",)}),
    )


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "level_bar", "position", "is_active")
    list_editable = ("position", "is_active")
    list_filter = ("category", "is_active")
    search_fields = ("name",)
    ordering = ("position", "name")

    @admin.display(description="Level")
    def level_bar(self, obj):
        color = "#4fffb0" if obj.level >= 80 else "#ffd166" if obj.level >= 60 else "#ef476f"
        return format_html(
            '<div style="width:120px;background:#1a1a2e;border-radius:3px;overflow:hidden">'
            '<div style="width:{}%;height:10px;background:{};border-radius:3px"></div>'
            '</div> <small>{}%</small>',
            obj.level,
            color,
            obj.level,
        )


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class TagInline(admin.TabularInline):
    model = Project.tags.through
    extra = 1
    verbose_name = "Tag"
    verbose_name_plural = "Tags"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "display_number",
        "title",
        "status",
        "colored_badge",
        "is_featured",
        "position",
        "is_active",
        "updated_at",
    )
    list_editable = ("position", "is_featured", "is_active")
    list_filter = ("status", "is_featured", "is_active")
    search_fields = ("title", "description")
    ordering = ("position",)
    inlines = [TagInline]
    exclude = ("tags",)
    fieldsets = (
        ("Project Info", {"fields": ("title", "description", "status", "accent_color")}),
        ("Links", {"fields": ("github_url", "live_url")}),
        ("Display Settings", {"fields": (("position", "is_featured"), "is_active")}),
    )

    @admin.display(description="Badge Color")
    def colored_badge(self, obj):
        return format_html(
            '<span style="display:inline-block;padding:2px 10px;border-radius:3px;'
            'background:{0}22;color:{0};border:1px solid {0}55;font-size:11px">{1}</span>',
            obj.accent_color,
            obj.status,
        )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("icon", "title", "position", "is_active")
    list_editable = ("position", "is_active")
    search_fields = ("title", "description")
    ordering = ("position",)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("get_platform_display", "url", "label", "position", "is_active")
    list_editable = ("position", "is_active")
    ordering = ("position",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "short_message", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("name", "email", "message")
    readonly_fields = ("name", "email", "message", "created_at")
    list_editable = ("is_read",)
    ordering = ("-created_at",)
    actions = ["mark_as_read", "mark_as_unread"]

    def has_add_permission(self, request):
        return False

    @admin.display(description="Message Preview")
    def short_message(self, obj):
        return obj.message[:80] + "..." if len(obj.message) > 80 else obj.message

    @admin.action(description="Mark selected messages as read")
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f"{updated} message(s) marked as read.")

    @admin.action(description="Mark selected messages as unread")
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f"{updated} message(s) marked as unread.")
