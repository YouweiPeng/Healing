from django.db import models
from datetime import datetime
class Article(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    author = models.CharField(max_length=100, default="anonym")
    publishDate = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return f"{self.title} by {self.author}"
