from django.db import models

class Tarea(models.Model):
    PRIORIDAD_CHOICES = [('ALTA', 'Alta'), ('MEDIA', 'Media'), ('BAJA', 'Baja')]
    ESTADO_CHOICES = [('PENDIENTE', 'Pendiente'), ('PROGRESO', 'En progreso'), ('COMPLETADA', 'Completada')]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True)
    prioridad = models.CharField(max_length=10, choices=PRIORIDAD_CHOICES, default='MEDIA')
    fecha_limite = models.DateField()
    estado = models.CharField(max_length=15, choices=ESTADO_CHOICES, default='PENDIENTE')
    asignado_a = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nombre