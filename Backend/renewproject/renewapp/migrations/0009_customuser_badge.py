# Generated by Django 4.1.10 on 2023-09-02 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renewapp', '0008_customuser_badge_names'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='badge',
            field=models.TextField(default='hi'),
        ),
    ]
