# Generated by Django 4.1.7 on 2023-03-31 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Conversion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fromUnit', models.CharField(max_length=10)),
                ('toUnit', models.CharField(max_length=10)),
                ('conversionNumber', models.FloatField()),
            ],
        ),
    ]
