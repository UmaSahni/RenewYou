# Generated by Django 4.1.10 on 2023-09-02 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renewapp', '0009_customuser_badge'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='badge_name',
            field=models.JSONField(blank=True, default=list, null=True),
        ),
    ]
