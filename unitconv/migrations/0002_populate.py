
from django.db import migrations
from django.utils import timezone

def populate_db(apps, schema_editor):
    Conversion = apps.get_model('unitconv', 'Conversion')

    TtoTroy = Conversion(fromUnit="T", toUnit="Troy", conversionNumber=29166.7).save()
    gtoTroy = Conversion(fromUnit="g", toUnit="Troy", conversionNumber=.0321507).save()
    kgtoTroy = Conversion(fromUnit="kg", toUnit="Troy", conversionNumber=32.1507).save()
    lbtoTroy = Conversion(fromUnit="lb", toUnit="Troy", conversionNumber=14.5833).save()
    oztoTroy = Conversion(fromUnit="oz", toUnit="Troy", conversionNumber=.911458).save()
    ttoTroy = Conversion(fromUnit="t_oz", toUnit="Troy", conversionNumber=1.0).save()



class Migration(migrations.Migration):

    dependencies = [
        ('unitconv', '0001_initial'),
    ]

    operations = [
        # I must add this call to `migrations.RunPython()` myself
        migrations.RunPython(populate_db)
    ]