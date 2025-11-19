import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  final String userRole;
  final Function(String screen) onNavigate;

  const HomeScreen({Key? key, required this.userRole, required this.onNavigate}) : super(key: key);

  Map<String, dynamic> getRoleSpecificData() {
    switch (userRole) {
      case 'doctor':
        return {
          'greeting': 'Dr. García',
          'subtitle': 'Sistema Médico Profesional',
          'stats': [
            {'label': 'Pacientes Hoy', 'value': '24', 'change': '+3'},
            {'label': 'Consultas', 'value': '18', 'change': '+2'},
            {'label': 'Urgencias', 'value': '2', 'change': '0'},
          ],
          'alerts': [
            {'message': 'Paciente urgente: María López', 'time': 'Ahora', 'urgent': true},
            {'message': '3 consultas pendientes', 'time': '30 min', 'urgent': false},
            {'message': 'Revisar historial Juan Pérez', 'time': '1 hora', 'urgent': false},
          ],
        };
      case 'nurse':
        return {
          'greeting': 'Enfermera Ana',
          'subtitle': 'Centro de Atención',
          'stats': [
            {'label': 'Signos Vitales', 'value': '67', 'change': '+5'},
            {'label': 'Medicamentos', 'value': '36', 'change': '+8'},
            {'label': 'Pacientes', 'value': '28', 'change': '+2'},
          ],
          'alerts': [
            {'message': 'Signos vitales paciente 205', 'time': 'Ahora', 'urgent': true},
            {'message': 'Administrar medicamentos sala 3', 'time': '15 min', 'urgent': false},
            {'message': 'Ronda de enfermería programada', 'time': '45 min', 'urgent': false},
          ],
        };
      case 'admin':
        return {
          'greeting': 'Admin Sistema',
          'subtitle': 'Panel de Control',
          'stats': [
            {'label': 'Usuarios Activos', 'value': '234', 'change': '+12'},
            {'label': 'Uptime Sistema', 'value': '99.8%', 'change': '+0.1%'},
            {'label': 'Consultas/día', 'value': '1,247', 'change': '+89'},
          ],
          'alerts': [
            {'message': 'Mantenimiento servidor 2', 'time': '2 horas', 'urgent': false},
            {'message': 'Backup completado exitosamente', 'time': '30 min', 'urgent': false},
            {'message': '5 nuevos usuarios registrados', 'time': '1 hora', 'urgent': false},
          ],
        };
      default: // patient
        return {
          'greeting': 'Juan Mendoza',
          'subtitle': 'Tu Salud Digital',
          'stats': [
            {'label': 'Presión Arterial', 'value': '120/80', 'change': 'Normal'},
            {'label': 'Frecuencia Cardíaca', 'value': '72 bpm', 'change': 'Estable'},
            {'label': 'Pasos Hoy', 'value': '8,234', 'change': '+15%'},
          ],
          'alerts': [
            {'message': 'Captopril 25mg - 16:00', 'time': '30 min', 'urgent': false},
            {'message': 'Consulta Dr. García', 'time': '2 días', 'urgent': false},
            {'message': 'Presión elevada detectada', 'time': '1 hora', 'urgent': true},
          ],
        };
    }
  }

  @override
  Widget build(BuildContext context) {
    final roleData = getRoleSpecificData();

    return Scaffold(
      appBar: AppBar(
        title: Text('Inicio'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Greeting
            Text(
              'Hola, ${roleData['greeting']}',
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            Text(
              roleData['subtitle'],
              style: TextStyle(fontSize: 16, color: Colors.grey),
            ),
            SizedBox(height: 16),

            // Stats
            Text('Resumen:', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: roleData['stats'].map<Widget>((stat) {
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Column(
                      children: [
                        Text(stat['label'], style: TextStyle(fontSize: 12, color: Colors.grey)),
                        Text(stat['value'], style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
                        Text(stat['change'], style: TextStyle(fontSize: 12, color: Colors.green)),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ),
            SizedBox(height: 16),

            // Alerts
            Text('Alertas:', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 8),
            ...roleData['alerts'].map<Widget>((alert) {
              return Card(
                color: alert['urgent'] ? Colors.red[50] : null,
                child: ListTile(
                  title: Text(alert['message']),
                  subtitle: Text(alert['time']),
                  trailing: alert['urgent'] ? Icon(Icons.warning, color: Colors.red) : null,
                ),
              );
            }).toList(),
            SizedBox(height: 16),

            // Quick Actions
            ElevatedButton(
              onPressed: () => onNavigate('chat'),
              child: Text(userRole == 'patient'
                  ? 'Hablar con el Asistente'
                  : userRole == 'doctor'
                      ? 'Ver Pacientes'
                      : userRole == 'nurse'
                          ? 'Gestionar Turnos'
                          : 'Panel Administrativo'),
            ),
          ],
        ),
      ),
    );
  }
}