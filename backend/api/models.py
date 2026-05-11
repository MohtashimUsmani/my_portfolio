from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Hero(models.Model):
    """Singleton model for the Hero section."""
    status_badge = models.CharField(max_length=80, default="Available for work")
    first_name = models.CharField(max_length=80, default="Mohtashim")
    last_name = models.CharField(max_length=80, default="Usmani")
    role_tagline = models.CharField(
        max_length=120,
        default="Data Scientist and Full-Stack Dev",
        help_text="Shown in italic next to last name",
    )
    description = models.TextField(
        default=(
            "I build intelligent web applications and extract meaning from data. "
            "Turning complex datasets into clear insights and shipping full-stack "
            "products powered by Python, Django, and Machine Learning."
        )
    )
    cta_primary_label = models.CharField(max_length=40, default="View My Work")
    cta_primary_url = models.CharField(max_length=200, default="#projects")
    cta_secondary_label = models.CharField(max_length=40, default="Get in Touch")
    cta_secondary_url = models.CharField(max_length=200, default="#contact")
    is_active = models.BooleanField(
        default=True,
        help_text="Only one Hero should be active at a time",
    )

    class Meta:
        verbose_name = "Hero Section"
        verbose_name_plural = "Hero Section"

    def __str__(self):
        return f"{self.first_name} {self.last_name} - Hero"

    def save(self, *args, **kwargs):
        if self.is_active:
            Hero.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)


class About(models.Model):
    """Singleton model for the About section and stats."""
    heading = models.CharField(max_length=120, default="Data-driven builder and problem solver")
    full_name = models.CharField(max_length=120, default="Mohtashim Usmani")
    paragraph_one = models.TextField(
        default=(
            "I am Mohtashim Usmani, a Data Scientist and Full-Stack Web Developer "
            "based in Pakistan. I sit at the intersection of data and engineering, "
            "equally comfortable training ML models and deploying them behind a "
            "polished web interface."
        )
    )
    paragraph_two = models.TextField(
        default=(
            "My work lives in Python and Django on the backend, where I design data "
            "pipelines, REST APIs, and intelligent systems. On the data side, I work "
            "across the full lifecycle from raw data wrangling with Pandas to "
            "building and evaluating production-ready ML models."
        )
    )
    years_experience = models.PositiveIntegerField(default=3)
    projects_shipped = models.PositiveIntegerField(default=15)
    models_deployed = models.PositiveIntegerField(default=5)
    fun_stat_label = models.CharField(
        max_length=40,
        default="Curiosity",
        help_text="Label for the fun stat card",
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = "About Section"
        verbose_name_plural = "About Section"

    def __str__(self):
        return f"About - {self.full_name}"

    def save(self, *args, **kwargs):
        if self.is_active:
            About.objects.exclude(pk=self.pk).update(is_active=False)
        super().save(*args, **kwargs)


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("Core", "Core"),
        ("Data", "Data and ML"),
        ("Web", "Web"),
        ("DevOps", "DevOps"),
    ]

    name = models.CharField(max_length=80)
    level = models.PositiveIntegerField(
        default=80,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
        help_text="Proficiency percentage (0-100)",
    )
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="Core")
    position = models.PositiveIntegerField(default=0, help_text="Display order (lower = first)")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["position", "name"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return f"{self.name} ({self.category}) - {self.level}%"


class Tag(models.Model):
    name = models.CharField(max_length=40, unique=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Project(models.Model):
    STATUS_CHOICES = [
        ("Featured", "Featured"),
        ("Live", "Live"),
        ("Open Source", "Open Source"),
        ("In Progress", "In Progress"),
        ("Archived", "Archived"),
    ]

    title = models.CharField(max_length=120)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="Featured")
    accent_color = models.CharField(
        max_length=10,
        default="#4fffb0",
        help_text="Hex color for the status badge, e.g. #4fffb0",
    )
    github_url = models.URLField(blank=True, default="", help_text="GitHub repository URL")
    live_url = models.URLField(blank=True, default="", help_text="Live demo URL (optional)")
    tags = models.ManyToManyField(Tag, blank=True, related_name="projects")
    position = models.PositiveIntegerField(default=0, help_text="Display order (lower = first)")
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["position", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return f"{self.title} [{self.status}]"

    @property
    def display_number(self):
        return str(self.position).zfill(2)


class Service(models.Model):
    icon = models.CharField(
        max_length=10,
        default="*",
        help_text="A single emoji or symbol shown as the service icon",
    )
    title = models.CharField(max_length=100)
    description = models.TextField()
    position = models.PositiveIntegerField(default=0, help_text="Display order (lower = first)")
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["position"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    PLATFORM_CHOICES = [
        ("github", "GitHub"),
        ("linkedin", "LinkedIn"),
        ("email", "Email"),
        ("twitter", "Twitter / X"),
        ("other", "Other"),
    ]

    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    url = models.CharField(max_length=200, help_text="Full URL or mailto: address for email")
    label = models.CharField(
        max_length=80,
        blank=True,
        help_text="Display label (optional, e.g. github.com/yourname)",
    )
    position = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["position"]
        verbose_name = "Social Link"
        verbose_name_plural = "Social Links"

    def __str__(self):
        return f"{self.get_platform_display()} - {self.url}"


class ContactMessage(models.Model):
    """Stores messages submitted through the portfolio contact form."""
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        status = "Read" if self.is_read else "Unread"
        return f"[{status}] {self.name} <{self.email}> - {self.created_at:%Y-%m-%d}"
