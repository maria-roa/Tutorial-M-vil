/* ===== Tutorial de Desarrollo de Aplicaciones Móviles · script.js ===== */
'use strict';

/* VIDEOS: un ID de YouTube distinto por apartado (la parte después de "v=").
   1 Git y GitHub (freeCodeCamp Español) · 2 SQLite con Room · 3 Sensores de luz y proximidad
   4 VideoView (reproducir video) · 5 WorkManager · 6 Flutter vs React Native · 7 Logcat.
   Si un video no carga, cambia su ID; si un ID está vacío se muestra un botón de búsqueda. */
const VIDEO_IDS = ['mBYSUUnMt9M', 'k4DoGeK1qtU', 'Y20IwooWjo4', 'zSsRXMlTA2A', 'ylCubXlj8gM', 'c1vuyTndhv8', 'eylbSkeWZDQ'];

/* ---------- Definiciones de la ventana emergente ---------- */
const TERMS = {
  'control de versiones': 'Sistema que registra los cambios de los archivos a lo largo del tiempo para poder recuperarlos, compararlos y colaborar.',
  'repositorio': 'Carpeta del proyecto que guarda los archivos y todo su historial de cambios.',
  'commit': 'Instantánea de los cambios guardados, con autor, fecha y mensaje.',
  'rama': 'Línea de desarrollo independiente que luego puede fusionarse con la principal.',
  'persistencia': 'Capacidad de conservar los datos aunque la app se cierre o el dispositivo se reinicie.',
  'SQLite': 'Motor de base de datos relacional ligero que vive en un solo archivo dentro del dispositivo.',
  'ORM': 'Mapeo objeto-relacional: permite trabajar con clases y objetos en lugar de escribir SQL a mano.',
  'API REST': 'Servicio web que expone recursos mediante URLs y métodos HTTP, normalmente respondiendo en JSON.',
  'token': 'Cadena que demuestra que el usuario ya se autenticó; se envía en cada petición.',
  'sensor': 'Componente de hardware que mide una magnitud física (movimiento, luz, posición) y la convierte en datos.',
  'permiso': 'Autorización que el usuario concede a la app para usar un recurso protegido (ubicación, cámara, notificaciones).',
  'códec': 'Algoritmo que comprime y descomprime audio o video (ej. H.264, AAC).',
  'servicio': 'Componente que ejecuta trabajo sin interfaz visible, por ejemplo reproducir música.',
  'WorkManager': 'Biblioteca de Android para tareas en segundo plano que deben ejecutarse de forma garantizada.',
  'push': 'Notificación enviada desde un servidor a través de FCM (Android) o APNs (iOS).',
  'biblioteca': 'Colección de funciones que tu código llama cuando las necesita; tú controlas el flujo.',
  'toolkit': 'Conjunto de herramientas, componentes y reglas para construir apps completas; suele definir la estructura del proyecto.',
  'depuración': 'Proceso de encontrar, analizar y corregir errores del programa.',
  'Logcat': 'Ventana de Android Studio que muestra los mensajes del sistema y de tu app en tiempo real.'
};
const T = k => `<button class="term" data-t="${k}">${k}</button>`;

const ICON_PATHS = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  git: '<circle cx="6" cy="5" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="6" cy="19" r="2"/><path d="M6 7v10m12-8a6 6 0 0 1-6 6H8"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  sensor: '<circle cx="12" cy="12" r="2"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8m12.8 0a9 9 0 0 0 0-12.8M8.4 8.4a5 5 0 0 0 0 7.2m7.2 0a5 5 0 0 0 0-7.2"/>',
  media: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="m10 8 6 4-6 4z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/>',
  code: '<path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-10-2 12"/>',
  bug: '<path d="M12 8a4 4 0 0 0-4 4v5a4 4 0 0 0 8 0v-5a4 4 0 0 0-4-4Zm-2-3 2 3 2-3M4 13h4m8 0h4M5 7l3 2m11-2-3 2M5 19l3-2m11 2-3-2M12 8V5"/>',
  cloud: '<path d="M7 18a4 4 0 0 1-.5-8A6 6 0 0 1 18 9.5 4.5 4.5 0 0 1 17.5 18z"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.4 8 8 9 4.6-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.5"/><path d="m21 16-5-5-8 8"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',
  play: '<path d="m8 5 11 7-11 7z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  pin: '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  file: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/>',
  diagram: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>',
  bulb: '<path d="M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
  book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5"/>',
  volume: '<path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  access: '<circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4l-3 6m3-6 3 6"/>',
  copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="15" r="1"/><circle cx="15" cy="9" r="1"/><circle cx="9" cy="15" r="1"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
  check: '<path d="m5 12 5 5 9-10"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>'
};
const TOPIC_ICONS = ['git', 'database', 'sensor', 'media', 'bell', 'code', 'bug'];
/* --- Categorías y temas recomendados --- */
const CATS = { herr: 'Herramientas', datos: 'Datos y nube', hw: 'Hardware y multimedia', seg: 'Calidad y seguridad' };
const CAT_OF = ['herr', 'datos', 'hw', 'hw', 'datos', 'herr', 'seg'];   // categoría de cada apartado
const FEAT = [[0, 'Base de todo trabajo en equipo'], [1, 'Casi toda app guarda o consulta datos'], [6, 'Encuentra errores y protege a tus usuarios']];

const icon = (name, className = '') => `<svg class="icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;

/* ---------- Ayudas para armar el HTML ---------- */
const ul = a => `<ul>${a.map(x => `<li>${x}</li>`).join('')}</ul>`;
const cards = a => `<div class="grid">${a.map(([h, p]) => `<article class="card"><h4>${h}</h4><p>${p}</p></article>`).join('')}</div>`;
const tbl = (h, r) => `<div class="tw"><table><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr>${r.map(x => `<tr>${x.map(y => `<td>${y}</td>`).join('')}</tr>`).join('')}</table></div>`;
const code = s => `<pre><code>${s}</code></pre>`;

/* ---------- Contenido de los siete apartados ---------- */
const S = [
/* 1 ------------------------------------------------ */
{ i: '🔀', i2: '🌿', t: 'Control de versiones', s: 'Versiones',
  lead: 'Aprende cómo se registran, comparan y recuperan los cambios de un proyecto.',
  c: ['Historial de cambios', 'Ramas y colaboración'],
  tabs: [
    ['Definición', `<p>El ${T('control de versiones')} guarda cada cambio de los archivos para volver a versiones anteriores, comparar y trabajar en equipo sin sobrescribir el trabajo de otros.</p>` +
      cards([['Historial', 'Cada cambio queda con autor, fecha y mensaje.'], ['Reversión', 'Se regresa a un estado estable si algo falla.'], ['Ramas', 'Se desarrollan funciones en paralelo.'], ['Colaboración', 'Varias personas editan el mismo proyecto.']])],
    ['Tipos', cards([
      ['Local', 'Las versiones se guardan en el mismo equipo (ej. RCS). Es simple, pero no permite trabajo en equipo y, si el equipo falla, se pierde todo.'],
      ['Centralizado', 'Un servidor único guarda el historial (CVS, Subversion). Es fácil de administrar, pero sin red o con el servidor caído no se puede trabajar.'],
      ['Distribuido', 'Cada clon contiene todo el historial (Git, Mercurial). Permite trabajar sin conexión y crear ramas rápidas; exige aprender más conceptos.']])],
    ['Ventajas y desventajas', tbl(['Tipo', 'Ventajas', 'Desventajas'], [
      ['Local', 'Sencillo, sin servidor', 'Sin colaboración ni respaldo'],
      ['Centralizado', 'Control de accesos, un solo lugar de verdad', 'Punto único de fallo, requiere conexión'],
      ['Distribuido', 'Respaldo en cada clon, trabajo offline, ramas ágiles', 'Curva de aprendizaje, conflictos de fusión']])],
    ['Funcionamiento', `<p>En Git los archivos pasan por cuatro zonas:</p>` + ul(['<b>Directorio de trabajo:</b> donde editas.', '<b>Área de preparación (staging):</b> eliges qué cambios entrarán al siguiente ' + T('commit') + '.', '<b>' + T('repositorio') + ' local:</b> guarda los commits en tu equipo.', '<b>Repositorio remoto:</b> copia compartida (ej. GitHub).'])],
    ['Rastreo de cambios', `<p>Con el historial puedes saber qué cambió, quién y cuándo:</p>` + code('git log --oneline   # historial resumido\ngit diff            # cambios sin guardar\ngit blame app.js    # autor de cada línea\ngit revert a1b2c3   # deshace un commit\ngit tag v1.0        # marca una versión') + `<p>Las ${T('rama')}s permiten probar ideas sin afectar la versión estable.</p>`],
    ['Ejemplos', `<p>Flujo básico con Git y GitHub:</p>` + code('git init\ngit add .\ngit commit -m "Primera versión"\ngit branch -M main\ngit remote add origin https://github.com/usuario/mi-app.git\ngit push -u origin main') + `<p><b>GitHub</b> aloja repositorios Git en la nube y añade <i>Pull Requests</i>, incidencias y revisión de código.</p>`]
  ],
  flow: [['Modificar', 'Editas archivos en tu directorio de trabajo.'], ['git add', 'Preparas los cambios en el área de staging.'], ['git commit', 'Guardas una instantánea en el repositorio local.'], ['git push', 'Envías los commits al repositorio remoto.'], ['Pull Request', 'Tu equipo revisa y fusiona los cambios.']],
  acc: [['¿Git y GitHub son lo mismo?', 'No. Git es el sistema de control de versiones; GitHub es un servicio en la nube que aloja repositorios Git.'], ['¿Qué es un conflicto de fusión?', 'Ocurre cuando dos ramas modifican las mismas líneas; hay que elegir manualmente el resultado final.']],
  r: [['Pro Git (libro en español)', 'https://git-scm.com/book/es/v2'], ['Documentación de GitHub', 'https://docs.github.com/es']]
},
/* 2 ------------------------------------------------ */
{ i: '💾', i2: '🗄️', t: 'Persistencia y acceso a datos', s: 'Datos',
  lead: 'Descubre cómo una app guarda información y se comunica con servidores.',
  c: ['Almacenamiento local', 'Datos en la nube'],
  tabs: [
    ['Definición', `<p>La ${T('persistencia')} conserva los datos más allá de la ejecución de la app.</p>` + ul(['Sobrevive a cierres y reinicios.', 'Debe ser rápida y consumir poca batería.', 'Debe proteger los datos sensibles.', 'Permite recuperar y actualizar la información cuando se necesite.'])],
    ['Formas de persistencia', cards([
      ['Archivos', 'Texto, JSON, XML o binarios en almacenamiento interno o externo. Ideales para configuraciones, caché y documentos.'],
      ['Base de datos local', `Datos estructurados dentro del dispositivo, como ${T('SQLite')}. Permiten consultas y funcionan sin internet.`],
      ['Base de datos remota', 'Datos en un servidor accesibles mediante servicios web. Se comparten entre dispositivos y usuarios, pero requieren red.']])],
    ['Tipos de datos', tbl(['Forma', 'Datos que almacena'], [
      ['Archivos', 'Imágenes, audio, video, JSON, texto, PDF'],
      ['Base local', 'Registros con tablas: usuarios, tareas, productos, historial'],
      ['Base remota', 'Cuentas, pedidos, publicaciones y datos compartidos entre usuarios'],
      ['Preferencias', 'Pares clave-valor: tema, idioma, sesión']])],
    ['Control de acceso', ul(['<b>Biblioteca de clases:</b> API del sistema o de terceros que abre, lee y escribe datos (ej. <code>SharedPreferences</code>, <code>File</code>).', '<b>Clases de ' + T('SQLite') + ':</b> abren la base, ejecutan consultas y manejan transacciones (ej. <code>SQLiteOpenHelper</code>).', '<b>Mapeo relacional de objetos (' + T('ORM') + '):</b> convierte tablas en clases (ej. Room en Android, Core Data en iOS).'])],
    ['Autenticación y servicios web', `<p>Proceso típico al consumir una ${T('API REST')}:</p>` + ul(['El usuario envía sus credenciales por HTTPS.', 'El servidor valida y devuelve un ' + T('token') + '.', 'La app guarda el token de forma segura.', 'Cada petición incluye el token en el encabezado <code>Authorization</code>.', 'El servidor responde en JSON y la app lo muestra.'])],
    ['Ejemplos', code('// Android + Room (Kotlin)\n@Entity data class Tarea(@PrimaryKey val id: Int, val titulo: String)\n@Dao interface TareaDao { @Query("SELECT * FROM Tarea") fun todas(): List&lt;Tarea&gt; }\n\n// Servicio web (JavaScript / React Native)\nconst r = await fetch(url, { headers: { Authorization: "Bearer " + token } });\nconst datos = await r.json();')]
  ],
  flow: [['App', 'El usuario realiza una acción.'], ['Autenticación', 'Se envían credenciales y se recibe un token.'], ['API REST', 'La petición viaja por HTTPS con el token.'], ['Base remota', 'El servidor consulta o modifica los datos.'], ['Respuesta JSON', 'La app muestra y guarda en local si hace falta.']],
  acc: [['¿Cuándo uso base local y cuándo remota?', 'Local para datos propios y modo sin conexión; remota para datos compartidos. Muchas apps combinan ambas y sincronizan.'], ['¿Dónde guardo el token?', 'En almacenamiento seguro: Keystore en Android o Keychain en iOS, nunca en texto plano.']],
  r: [['Android: almacenamiento de datos', 'https://developer.android.com/training/data-storage'], ['Room (ORM de Android)', 'https://developer.android.com/training/data-storage/room']]
},
/* 3 ------------------------------------------------ */
{ i: '📍', i2: '🧭', t: 'Gestión de sensores', s: 'Sensores',
  lead: 'Conoce los sensores del teléfono y cómo una app lee sus datos.',
  c: ['Sensores de movimiento', 'Ubicación y entorno'],
  tabs: [
    ['Definición', `<p>Un ${T('sensor')} mide una magnitud física y entrega datos digitales a la app. Con ellos se crean apps de mapas, juegos, salud o ahorro de batería.</p>`],
    ['Tipos', cards([
      ['Movimiento', 'Acelerómetro, giroscopio, gravedad, vector de rotación.'],
      ['Posición', 'GPS (GNSS), magnetómetro, orientación.'],
      ['Ambientales', 'Luz ambiental, proximidad, presión, temperatura, humedad.'],
      ['Biométricos', 'Huella dactilar, reconocimiento facial, ritmo cardíaco (según el equipo).']])],
    ['Proceso de gestión', ul(['<b>Habilitación:</b> declarar y solicitar el ' + T('permiso') + ' necesario (ej. ubicación) y verificar que el sensor exista.', '<b>Obtención:</b> registrar un <i>listener</i> y recibir eventos con los valores del sensor.', '<b>Procesamiento:</b> filtrar el ruido, calibrar, convertir unidades y reaccionar a los datos.', '<b>Liberación:</b> cancelar el registro al salir para ahorrar batería.'])],
    ['Ejemplos', tbl(['Sensor', 'Qué mide', 'Uso típico'], [
      ['GPS', 'Latitud y longitud', 'Mapas, navegación, reparto'],
      ['Acelerómetro', 'Aceleración en 3 ejes', 'Contar pasos, detectar sacudidas'],
      ['Giroscopio', 'Velocidad de giro', 'Juegos, realidad aumentada'],
      ['Proximidad', 'Cercanía de un objeto', 'Apagar pantalla en llamadas'],
      ['Luz ambiental', 'Iluminación en lux', 'Brillo automático, modo oscuro']]) +
      code('// Android (Kotlin)\nval sm = getSystemService(SENSOR_SERVICE) as SensorManager\nval acel = sm.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)\nsm.registerListener(this, acel, SensorManager.SENSOR_DELAY_NORMAL)')]
  ],
  flow: [['Permiso', 'Se solicita al usuario si el sensor es sensible.'], ['Registrar', 'Se registra el listener del sensor.'], ['Evento', 'El sistema entrega nuevos valores.'], ['Procesar', 'Se filtran y se convierten los datos.'], ['Liberar', 'Se cancela el listener para ahorrar batería.']],
  acc: [['¿Todos los sensores piden permiso?', 'No. El acelerómetro y el de luz no lo piden en Android, pero la ubicación y la cámara sí.'], ['¿Por qué cancelar el listener?', 'Un sensor activo consume batería aunque la app no esté visible.']],
  r: [['Descripción de sensores (Android)', 'https://developer.android.com/develop/sensors-and-location/sensors/sensors_overview'], ['Sensores en Flutter (sensors_plus)', 'https://pub.dev/packages/sensors_plus']]
},
/* 4 ------------------------------------------------ */
{ i: '🎬', i2: '🎨', t: 'Uso de recursos multimedia', s: 'Multimedia',
  lead: 'Imágenes, audio, video y animaciones: cómo se guardan y se usan en una app.',
  c: ['Imágenes y video', 'Audio y animaciones'],
  tabs: [
    ['Definición', '<p>Los recursos multimedia son contenidos visuales y sonoros que enriquecen la app. Deben optimizarse en tamaño y formato para cuidar memoria, datos y batería.</p>'],
    ['Tipos de recursos', cards([
      ['Imágenes', 'PNG, JPG, WebP y vectores (SVG/VectorDrawable). Se adaptan a varias densidades de pantalla.'],
      ['Audio', 'MP3, AAC, OGG. Para música, efectos y voz.'],
      ['Video', 'MP4 (H.264). Local o en <i>streaming</i>.'],
      ['Animaciones', 'Lottie, animaciones de propiedades, GIF y transiciones.'],
      ['Elementos dinámicos', 'Gráficos, mapas, lienzos (Canvas) y listas que cambian con los datos.']])],
    ['Estructura del proyecto', tbl(['Plataforma', 'Dónde se guardan'], [
      ['Android', '<code>res/drawable</code>, <code>res/mipmap</code>, <code>res/raw</code> y <code>assets/</code>'],
      ['iOS', '<code>Assets.xcassets</code> y archivos en el bundle'],
      ['Flutter', 'Carpeta <code>assets/</code> declarada en <code>pubspec.yaml</code>'],
      ['React Native', 'Carpeta <code>assets/</code> importada con <code>require()</code>']])],
    ['Componentes de software', ul(['<b>Imágenes:</b> ImageView, Glide, Coil, Image (Flutter/RN).', '<b>Audio:</b> MediaPlayer, SoundPool, AVAudioPlayer.', '<b>Video:</b> VideoView, ExoPlayer/Media3, AVPlayer.', '<b>Animaciones:</b> Lottie, MotionLayout, Animated (RN).', 'Un ' + T('códec') + ' decodifica cada formato.']) +
      code('// Android: reproducir un audio de res/raw\nval mp = MediaPlayer.create(this, R.raw.sonido)\nmp.start()')]
  ],
  flow: [['Recurso', 'Se agrega a la carpeta correspondiente.'], ['Optimización', 'Se comprime y se ajusta a la densidad.'], ['Carga', 'Un componente lo lee en segundo plano.'], ['Reproducción', 'Se muestra o se reproduce.'], ['Liberación', 'Se libera la memoria al terminar.']],
  acc: [['¿Por qué usar WebP o vectores?', 'Pesan menos que PNG/JPG y los vectores se ven nítidos en cualquier tamaño.'], ['¿Qué pasa si no libero un MediaPlayer?', 'Se consumen memoria y recursos de audio; se debe llamar a release().']],
  r: [['Medios en Android', 'https://developer.android.com/media'], ['Assets en Flutter', 'https://docs.flutter.dev/ui/assets/assets-and-images']]
},
/* 5 ------------------------------------------------ */
{ i: '🔔', i2: '☁️', t: 'Servicios y notificaciones', s: 'Servicios',
  lead: 'Tareas que corren en segundo plano, avisos al usuario y servicios en la nube.',
  c: ['Segundo plano', 'Notificaciones y nube'],
  tabs: [
    ['Definición', `<p>Un ${T('servicio')} realiza trabajo sin pantalla. Una notificación avisa al usuario de algo importante incluso con la app cerrada.</p>`],
    ['Tareas en segundo plano', `<p>Son operaciones que no bloquean la interfaz: sincronizar datos, descargar archivos o subir fotos.</p>` + ul(['<b>Servicios en primer plano:</b> visibles con una notificación (ej. música).', T('WorkManager') + ': tareas diferibles y garantizadas.', 'iOS: <code>BGTaskScheduler</code> y <i>background fetch</i>.', 'El sistema limita el segundo plano para ahorrar batería.'])],
    ['Notificaciones', ul(['<b>Locales:</b> las genera la propia app (recordatorios).', 'Remotas (' + T('push') + '): llegan desde un servidor por FCM o APNs.', 'Android usa <b>canales</b> para que el usuario controle cada tipo.', 'Desde Android 13 se requiere permiso de notificaciones.', 'Se pueden añadir acciones, imágenes y toques que abren una pantalla.'])],
    ['Implementación', ul(['<b>Proveedores de contenido (ContentProvider):</b> comparten datos entre apps mediante URIs.', '<b>Tareas en segundo plano:</b> se define un <i>Worker</i> y se programa con restricciones (red, batería).', '<b>Notificaciones:</b> se crea un canal y se construye con <code>NotificationCompat</code>.']) +
      code('// Android: notificación simple\nval n = NotificationCompat.Builder(this, "canal1")\n  .setSmallIcon(R.drawable.ic_bell)\n  .setContentTitle("Recordatorio")\n  .setContentText("Tienes una tarea pendiente").build()\nNotificationManagerCompat.from(this).notify(1, n)')],
    ['Servicios en la nube', tbl(['Servicio', 'Para qué sirve'], [
      ['Firebase', 'Autenticación, base de datos, almacenamiento y notificaciones push (FCM)'],
      ['AWS Amplify', 'Backend, autenticación, APIs y almacenamiento'],
      ['Azure Mobile Apps', 'Sincronización de datos y notificaciones'],
      ['Google Cloud', 'Cómputo, funciones sin servidor y bases de datos']])]
  ],
  flow: [['Evento', 'Ocurre un cambio en el servidor.'], ['Servidor', 'Envía el mensaje a FCM o APNs.'], ['Servicio push', 'Entrega el mensaje al dispositivo.'], ['App', 'Recibe y procesa el mensaje.'], ['Notificación', 'El usuario la ve y la abre.']],
  acc: [['¿Servicio o WorkManager?', 'Servicio para algo inmediato y visible; WorkManager para trabajo diferible que debe completarse.'], ['¿Una push necesita la app abierta?', 'No. El sistema operativo la recibe aunque la app esté cerrada.']],
  r: [['Trabajo en segundo plano (Android)', 'https://developer.android.com/develop/background-work'], ['Firebase Cloud Messaging', 'https://firebase.google.com/docs/cloud-messaging']]
},
/* 6 ------------------------------------------------ */
{ i: '🧰', i2: '⚙️', t: 'Librerías y toolkits', s: 'Toolkits',
  lead: 'Diferencia una biblioteca de un toolkit y compara las opciones más usadas.',
  c: ['Librerías especializadas', 'Comparativa de toolkits'],
  tabs: [
    ['Biblioteca vs toolkit', cards([
      ['Biblioteca', `Conjunto de funciones que tú llamas cuando las necesitas (${T('biblioteca')}). Tú controlas el flujo.`],
      ['Toolkit', `Conjunto de herramientas y componentes para construir apps completas (${T('toolkit')}). Suele marcar la estructura del proyecto.`]])],
    ['Librerías especializadas', tbl(['Librería', 'Función'], [
      ['Retrofit / Alamofire / Dio', 'Peticiones HTTP a servicios web'],
      ['Glide / Coil', 'Carga y caché de imágenes'],
      ['Room', 'Base de datos local con ORM'],
      ['Lottie', 'Animaciones vectoriales'],
      ['Hilt / Dagger', 'Inyección de dependencias']])],
    ['Toolkits', tbl(['Toolkit', 'Lenguaje', 'Característica'], [
      ['Android SDK', 'Kotlin / Java', 'Nativo para Android; acceso total al sistema'],
      ['iOS SDK', 'Swift', 'Nativo para iPhone/iPad con Xcode'],
      ['React Native', 'JavaScript / TypeScript', 'Multiplataforma; usa componentes nativos'],
      ['Flutter', 'Dart', 'Multiplataforma; dibuja su propia interfaz']])],
    ['¿Cuál elegir?', ul(['<b>Nativo:</b> máximo rendimiento y acceso inmediato a novedades del sistema.', '<b>React Native:</b> ideal si tu equipo ya sabe JavaScript.', '<b>Flutter:</b> interfaz idéntica en todas las plataformas con una base de código.', 'Considera tiempo, presupuesto, rendimiento y experiencia del equipo.'])]
  ],
  flow: [['Necesidad', 'Defines qué debe hacer tu app.'], ['Elegir toolkit', 'Nativo, React Native o Flutter.'], ['Añadir librerías', 'Red, imágenes, base de datos.'], ['Construir', 'Desarrollas con el toolkit elegido.'], ['Publicar', 'Subes a Google Play o App Store.']],
  acc: [['¿Multiplataforma significa peor rendimiento?', 'No necesariamente. Flutter y React Native rinden bien en la mayoría de las apps; los juegos o gráficos muy exigentes suelen ir nativos.'], ['¿Cuántas librerías conviene usar?', 'Solo las necesarias: cada una aumenta el tamaño, el mantenimiento y la superficie de ataque.']],
  r: [['React Native', 'https://reactnative.dev/docs/getting-started'], ['Flutter', 'https://docs.flutter.dev'], ['Android Developers', 'https://developer.android.com/']]
},
/* 7 ------------------------------------------------ */
{ i: '🐞', i2: '🔐', t: 'Depuración y seguridad', s: 'Seguridad',
  lead: 'Encuentra errores con las herramientas del IDE y protege tu app y a tus usuarios.',
  c: ['Depuración con Android Studio', 'Buenas prácticas de seguridad'],
  tabs: [
    ['Definición', `<p>La ${T('depuración')} consiste en localizar y corregir errores. La seguridad protege los datos, el código y los usuarios frente a accesos no autorizados.</p>`],
    ['Herramientas de depuración', tbl(['Herramienta', 'Uso'], [
      ['Depurador de Android Studio', 'Puntos de interrupción, ejecución paso a paso y variables'],
      [T('Logcat'), 'Lee mensajes y errores del sistema y de la app'],
      ['Layout Inspector', 'Inspecciona la jerarquía de vistas en ejecución'],
      ['Profiler', 'Mide CPU, memoria, red y batería'],
      ['Xcode / Flutter DevTools', 'Equivalentes para iOS y Flutter']])],
    ['Ejemplo con Logcat', code('Log.d("Login", "Usuario autenticado")   // depuración\nLog.e("Red", "Falló la conexión", error)  // error') + '<p>En Logcat puedes filtrar por etiqueta (<code>tag:Login</code>) o por nivel: Verbose, Debug, Info, Warning y Error.</p>'],
    ['Buenas prácticas de seguridad', ul(['Usar <b>HTTPS</b> en toda comunicación.', 'Guardar secretos en <b>Keystore/Keychain</b>, nunca en el código.', 'Pedir solo los ' + T('permiso') + 's necesarios.', 'Validar las entradas del usuario y del servidor.', 'Ofuscar el código (R8/ProGuard) en versiones de producción.', 'No registrar datos sensibles en Logcat.', 'Mantener dependencias actualizadas.', 'Seguir la guía OWASP MASVS.'])]
  ],
  flow: [['Reproducir', 'Repites el error de forma controlada.'], ['Observar', 'Revisas Logcat y variables.'], ['Aislar', 'Con puntos de interrupción localizas la causa.'], ['Corregir', 'Modificas el código.'], ['Verificar', 'Pruebas de nuevo y compruebas que no hay otros fallos.']],
  acc: [['¿Por qué no dejar Log.d en producción?', 'Puede exponer datos sensibles y hacer más lenta la app.'], ['¿Qué es OWASP MASVS?', 'Un estándar de verificación de seguridad para aplicaciones móviles.']],
  r: [['Depurar tu app (Android)', 'https://developer.android.com/studio/debug'], ['OWASP Mobile Application Security', 'https://mas.owasp.org/'], ['Seguridad en Android', 'https://developer.android.com/privacy-and-security']]
}
];

/* ---------- Utilidades de interfaz ---------- */
const $ = (s, e = document) => e.querySelector(s);
const $$ = (s, e = document) => [...e.querySelectorAll(s)];
let seen = new Set();
try { seen = new Set(JSON.parse(localStorage.getItem('seen') || '[]')); } catch (e) { /* sin almacenamiento */ }
const save = () => { try { localStorage.setItem('seen', JSON.stringify([...seen])); } catch (e) { /* ignorar */ } };

/* Ilustraciones SVG (2 por apartado): escena con panel central, íconos orbitando y leyenda */
const ART2 = ['layers', 'cloud', 'pin', 'music', 'cloud', 'gear', 'shield'];
const ORBIT = [['phone', 'file', 'lock', 'code'], ['database', 'cloud', 'file', 'shield'], ['pin', 'phone', 'gear', 'sensor'], ['image', 'music', 'file', 'phone'], ['phone', 'bell', 'cloud', 'gear'], ['gear', 'phone', 'layers', 'code'], ['lock', 'bug', 'phone', 'shield']];
const glyph = (n, x, y, sc, w = 1.7) => `<g transform="translate(${x} ${y}) scale(${sc})" fill="none" stroke="#fff" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[n]}</g>`;
function art(i, k) {
  const d = S[i], h = 262 + i * 9 - k * 45, main = k ? ART2[i] : TOPIC_ICONS[i], o = ORBIT[i], u = `${i}${k}`;
  const pos = k ? [[56, 50], [344, 52], [62, 150], [340, 148]] : [[344, 50], [58, 52], [336, 150], [66, 146]];
  const badges = pos.map(([x, y], n) => `<circle cx="${x}" cy="${y}" r="25" fill="#ffffff1c" stroke="#ffffff55"/>${glyph(o[(n + k) % 4], x - 14, y - 14, 1.17, 1.6)}`).join('');
  return `<figure><svg viewBox="0 0 400 220" role="img" aria-label="Ilustración: ${d.c[k]}"><defs>
<linearGradient id="g${u}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${h},78%,46%)"/><stop offset="1" stop-color="hsl(${h - 50},70%,13%)"/></linearGradient>
<radialGradient id="r${u}"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<pattern id="p${u}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" stroke-opacity=".08"/></pattern></defs>
<rect width="400" height="220" fill="url(#g${u})"/><rect width="400" height="220" fill="url(#p${u})"/>
<circle cx="200" cy="95" r="95" fill="url(#r${u})"/>
<path d="M100 70H60M300 70h40M110 140H66M290 140h44" stroke="#fff" stroke-opacity=".3" stroke-dasharray="4 5"/>${badges}
<rect x="147" y="38" width="106" height="106" rx="28" fill="#0d0a2255" stroke="#fff" stroke-opacity=".6" stroke-width="2"/>${glyph(main, 163, 54, 3.0, 1.5)}
<rect x="${200 - d.c[k].length * 5.2 - 14}" y="164" width="${d.c[k].length * 10.4 + 28}" height="32" rx="16" fill="#0d0a2299" stroke="#fff" stroke-opacity=".35"/>
<text x="200" y="185" font-size="16" font-weight="700" fill="#fff" text-anchor="middle" font-family="system-ui,sans-serif">${d.c[k]}</text></svg></figure>`;
}

/* Video: portada con miniatura; al hacer clic se reproduce DENTRO de la página */
function video(i) {
  const id = VIDEO_IDS[i], t = S[i].t;
  const note = location.protocol === 'file:' ? `<p class="note">${icon('play')}<span>Estás abriendo el archivo directamente (file://). YouTube bloquea sus reproductores en ese modo: abre la carpeta con <b>Live Server</b> de VS Code (clic derecho en index.html → Open with Live Server) para ver los videos aquí mismo.</span></p>` : '';
  if (!id) return `<div class="card vbox"><p>Video sobre ${t.toLowerCase()}</p><br><a class="btn" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent('tutorial ' + t + ' desarrollo móvil')}">${icon('play')} Buscar en YouTube</a></div>`;
  return `${note}<div class="vwrap" data-vid="${id}" data-title="${t}"><button class="poster" aria-label="Reproducir video: ${t}"><img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()"><span class="pbtn">${icon('play')}</span><span class="ptxt">Reproducir video</span></button></div><p class="refs">¿No carga? <a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v=${id}">Ábrelo en YouTube</a>.</p>`;
}
/* Clic en la portada: se inserta el reproductor incrustado con reproducción automática */
document.addEventListener('click', e => {
  const b = e.target.closest('.poster'); if (!b) return;
  const w = b.parentElement;
  w.innerHTML = `<iframe class="vid" src="https://www.youtube-nocookie.com/embed/${w.dataset.vid}?autoplay=1&rel=0&modestbranding=1&playsinline=1" title="Video: ${w.dataset.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
});

/* Arma el HTML completo de un apartado */
function sec(i) {
  const d = S[i];
  return `<h2>${icon(TOPIC_ICONS[i], 'h-ic')} ${i + 1}. ${d.t}</h2><p class="lead">${d.lead}</p><button class="btn alt" id="speak" type="button">${icon('volume')}<span>Leer en voz alta</span></button>
  <div class="arts">${art(i, 0)}${art(i, 1)}</div>
  <div class="tabs" role="tablist">${d.tabs.map((t, n) => `<button role="tab" data-tab="${n}" class="${n ? '' : 'on'}">${t[0]}</button>`).join('')}</div>
  ${d.tabs.map((t, n) => `<div class="panel" data-panel="${n}" ${n ? 'hidden' : ''}>${t[1]}</div>`).join('')}
  <h3>${icon('diagram')} Diagrama interactivo</h3>
  <div class="flow">${d.flow.map((f, n) => `<button class="node ${n ? '' : 'on'}" data-n="${n}">${n + 1}. ${f[0]}</button>`).join('')}</div>
  <div class="info" id="info">${d.flow[0][1]}</div>
  <h3>${icon('bulb')} Profundiza</h3>${d.acc.map(a => `<details name="acc"><summary>${a[0]}</summary><p>${a[1]}</p></details>`).join('')}
  ${quiz(i)}
  <h3>${icon('play')} Video</h3>${video(i)}
  <h3>${icon('book')} Referencias</h3><ul class="refs">${d.r.map(r => `<li><a target="_blank" rel="noopener" href="${r[1]}">${r[0]}</a> — ${r[1]}</li>`).join('')}</ul>
  <div class="pager"><button class="btn alt" data-go="${i - 1}" ${i ? '' : 'disabled'}>← Anterior</button><button class="btn alt" data-go="-1">${icon('home')} Inicio</button><button class="btn" data-go="${i + 1}" ${i < 6 ? '' : 'disabled'}>Siguiente →</button></div>`;
}

/* Pestañas y diagrama del apartado actual */
function bind(v) {
  $$('[data-tab]', v).forEach(b => b.onclick = () => {
    $$('[data-tab]', v).forEach(x => x.classList.toggle('on', x === b));
    $$('[data-panel]', v).forEach(p => p.hidden = p.dataset.panel !== b.dataset.tab);
  });
  $$('.node', v).forEach(b => b.onclick = () => {
    $$('.node', v).forEach(x => x.classList.toggle('on', x === b));
    $('#info', v).textContent = S[cur].flow[b.dataset.n][1];
  });
  $$('[data-go]', v).forEach(b => b.onclick = () => go(+b.dataset.go));
}

/* ---------- Navegación sin recargar (hash) ---------- */
let cur = -1;
const go = n => { location.hash = n < 0 ? '#home' : '#s' + (n + 1); };

function route() {
  const m = location.hash.match(/^#s([1-7])$/);
  cur = m ? m[1] - 1 : -1;
  stopSpeak();
  $('#q').value = ''; $('#qc').hidden = true;   // navegar limpia la búsqueda
  const v = $('#view');
  vis();
  if (cur >= 0) {
    seen.add(cur); save();
    v.innerHTML = sec(cur);
    v.classList.remove('fade'); void v.offsetWidth; v.classList.add('fade');
    bind(v); enhance(v);
  }
  $$('#nav a').forEach((a, n) => a.classList.toggle('on', n - 1 === cur));
  $$('#topics .card').forEach((c, n) => c.querySelector('.ok').textContent = seen.has(n) ? '✓ Visto' : '');
  $('#pb').style.width = (cur >= 0 ? (cur + 1) / 7 : seen.size / 7) * 100 + '%';
  $('#hp').textContent = `Progreso: has visitado ${seen.size} de 7 apartados.`;
  $('#nav').classList.remove('open');
  $('#burger').setAttribute('aria-expanded', 'false');
  scrollTo(0, 0);
  applyPending();
}

/* ---------- Inicio: menú y tarjetas de temas ---------- */
$('#nav').innerHTML = `<a href="#home">${icon('home')}<span>Inicio</span></a>` + S.map((d, n) => `<a href="#s${n + 1}">${icon(TOPIC_ICONS[n])}<span>${d.s}</span></a>`).join('');
$('#topics').innerHTML = S.map((d, n) => `<button class="card topic-card" data-go="${n}"><span class="topic-icon">${icon(TOPIC_ICONS[n])}</span><span class="topic-number">0${n + 1}</span><span class="ok" aria-hidden="true"></span><span class="cat">${CATS[CAT_OF[n]]}</span><h4>${d.t}</h4><p>${d.lead}</p><span class="topic-link">Explorar ${icon('arrow')}</span></button>`).join('');
$$('#topics [data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));

/* Menú hamburguesa */
$('#burger').onclick = () => {
  const o = $('#nav').classList.toggle('open');
  $('#burger').setAttribute('aria-expanded', o);
};

/* Ventana emergente de definiciones */
document.addEventListener('click', e => {
  const t = e.target.closest('.term');
  if (t) { $('#dt').textContent = t.dataset.t; $('#dd').textContent = TERMS[t.dataset.t] || ''; $('#dlg').showModal(); }
});
$('#dx').onclick = () => $('#dlg').close();
$('#dlg').addEventListener('click', e => { if (e.target.id === 'dlg') e.target.close(); });

/* Botón volver arriba */
addEventListener('scroll', () => $('#top').classList.toggle('show', scrollY > 300), { passive: true });
$('#top').onclick = () => scrollTo({ top: 0, behavior: P.nm ? 'auto' : 'smooth' });

/* ======================================================================
   NUEVAS FUNCIONES: categorías, retos, buscador, accesibilidad
   ====================================================================== */

/* --- Mini retos: [pregunta, opciones, índice correcto, explicación] --- */
const QUIZ = [
  { c: 'En una carpeta de prueba ejecuta git init, crea un archivo y haz tu primer commit con un mensaje claro.', q: [
    ['¿Qué comando guarda una instantánea de los cambios preparados?', ['git add', 'git commit', 'git push', 'git clone'], 1, 'git add prepara los cambios; git commit guarda la instantánea en el repositorio local.'],
    ['¿Qué tipo de control de versiones es Git?', ['Local', 'Centralizado', 'Distribuido', 'Manual'], 2, 'Cada clon contiene todo el historial del proyecto.']] },
  { c: 'Dibuja una tabla «Tareas» (id, título, hecha) y decide si guardarías sus datos en una base local o remota.', q: [
    ['¿Qué hace un ORM?', ['Cifra la red', 'Convierte tablas en clases y objetos', 'Reproduce video', 'Compila la app'], 1, 'Permite trabajar con objetos en lugar de escribir SQL a mano.'],
    ['¿Dónde conviene guardar un token de sesión?', ['En un archivo de texto', 'En el código fuente', 'En Keystore o Keychain', 'En el nombre de la app'], 2, 'Son almacenes seguros del sistema operativo.']] },
  { c: 'Imagina una app de pasos: ¿qué sensor usarías y cuándo cancelarías el listener?', q: [
    ['¿Qué sensor mide la aceleración en tres ejes?', ['Giroscopio', 'Acelerómetro', 'Proximidad', 'Luz ambiental'], 1, 'El giroscopio mide giro; el acelerómetro mide aceleración.'],
    ['¿Por qué se cancela el listener de un sensor?', ['Para ahorrar batería', 'Para cambiar de idioma', 'Para actualizar Android', 'No hace falta'], 0, 'Un sensor activo consume batería aunque la app no se vea.']] },
  { c: 'Lista tres recursos multimedia de una app de recetas y la carpeta donde guardarías cada uno.', q: [
    ['¿En qué carpeta de Android van los audios sin procesar?', ['res/raw', 'res/values', 'AndroidManifest', 'build'], 0, 'res/raw guarda archivos tal cual, como audio.'],
    ['¿Qué se debe hacer al terminar de usar un MediaPlayer?', ['Nada', 'Llamar a release()', 'Reiniciar el teléfono', 'Borrar la app'], 1, 'release() libera memoria y recursos de audio.']] },
  { c: 'Describe una tarea de tu app para WorkManager y otra para un servicio en primer plano.', q: [
    ['¿Qué es una notificación push?', ['La crea la app sin internet', 'Llega desde un servidor por FCM o APNs', 'Es un SMS', 'Es un correo'], 1, 'El servidor la envía y el sistema operativo la entrega.'],
    ['¿Qué herramienta programa trabajo diferible y garantizado en Android?', ['WorkManager', 'Logcat', 'Glide', 'Room'], 0, 'WorkManager es el programador recomendado.']] },
  { c: 'Elige un toolkit para una app de tu escuela y justifica tu elección en dos frases.', q: [
    ['¿Qué lenguaje usa Flutter?', ['Kotlin', 'Swift', 'Dart', 'C#'], 2, 'Flutter usa Dart; React Native usa JavaScript o TypeScript.'],
    ['¿En qué se diferencia una biblioteca de un toolkit?', ['Tú llamas a la biblioteca; el toolkit suele marcar la estructura de la app', 'En nada', 'Solo existen en iOS', 'La biblioteca siempre es de pago'], 0, 'Un toolkit es un conjunto más amplio de herramientas y reglas.']] },
  { c: 'Pon un punto de interrupción en tu app, ejecútala en modo depuración y observa las variables.', q: [
    ['¿Qué herramienta muestra los mensajes de la app en tiempo real?', ['Logcat', 'Layout Inspector', 'Gradle', 'El emulador'], 0, 'Logcat muestra los registros del sistema y de tu app.'],
    ['¿Qué práctica protege mejor los datos en la red?', ['Usar HTTP', 'Usar HTTPS', 'Quitar permisos', 'Guardar contraseñas en el código'], 1, 'HTTPS cifra la comunicación entre la app y el servidor.']] }
];
const quiz = i => `<h3>${icon('star')} Mini reto</h3><p class="reto"><b>Reto práctico:</b> ${QUIZ[i].c}</p><div class="quiz">${QUIZ[i].q.map((x, n) => `<fieldset class="qz" data-n="${n}"><legend>${n + 1}. ${x[0]}</legend>${x[1].map((o, k) => `<button type="button" class="opt" data-k="${k}">${o}</button>`).join('')}<p class="fb" role="status"></p></fieldset>`).join('')}<p class="score" role="status"></p></div>`;

/* --- Mejoras del apartado: copiar código, teclado en pestañas, retos, lectura --- */
async function copyText(t, b) {
  try { await navigator.clipboard.writeText(t); }
  catch (e) { const a = document.createElement('textarea'); a.value = t; document.body.append(a); a.select(); document.execCommand('copy'); a.remove(); }
  const s = $('span', b), o = s.textContent; s.textContent = '¡Copiado!'; setTimeout(() => s.textContent = o, 1600);
}
function enhance(v) {
  $$('pre', v).forEach(pre => {                       // botón «Copiar» en cada ejemplo de código
    const w = document.createElement('div'); w.className = 'codewrap'; pre.replaceWith(w); w.append(pre);
    const b = document.createElement('button'); b.type = 'button'; b.className = 'copy';
    b.innerHTML = icon('copy') + '<span>Copiar</span>'; b.setAttribute('aria-label', 'Copiar código');
    b.onclick = () => copyText(pre.textContent, b); w.append(b);
  });
  const tabs = $$('[data-tab]', v);                   // pestañas accesibles con flechas del teclado
  $$('[data-panel]', v).forEach(p => p.setAttribute('role', 'tabpanel'));
  const mark = a => tabs.forEach(x => { x.setAttribute('aria-selected', x === a); x.tabIndex = x === a ? 0 : -1; });
  tabs.forEach((b, n) => {
    mark($('[data-tab].on', v));
    b.addEventListener('click', () => mark(b));
    b.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (!k) return;
      e.preventDefault(); const t = tabs[(n + k + tabs.length) % tabs.length]; t.focus(); t.click();
    });
  });
  $$('.qz', v).forEach(f => f.addEventListener('click', e => {   // mini retos
    const o = e.target.closest('.opt'); if (!o || f.dataset.done) return;
    f.dataset.done = 1;
    const q = QUIZ[cur].q[f.dataset.n], k = +o.dataset.k, ok = k === q[2];
    $$('.opt', f).forEach((x, j) => {
      x.disabled = true;
      if (j === q[2]) { x.classList.add('ok'); x.insertAdjacentText('afterbegin', '✓ '); }
      else if (j === k) { x.classList.add('bad'); x.insertAdjacentText('afterbegin', '✗ '); }
    });
    $('.fb', f).textContent = (ok ? '✓ ¡Correcto! ' : '✗ No exactamente. ') + q[3];
    f.dataset.res = ok ? 1 : 0;
    const all = $$('.qz', v);
    if (all.every(x => x.dataset.done)) $('.score', v).textContent = `Resultado: ${all.filter(x => x.dataset.res === '1').length} de ${all.length} respuestas correctas.`;
  }));
  const sp = $('#speak', v);
  if (sp) { if (!('speechSynthesis' in window)) sp.hidden = true; else sp.onclick = () => toggleSpeak(v); }
}

/* --- Lectura en voz alta (Web Speech API del navegador) --- */
let speaking = false;
function stopSpeak() {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  speaking = false; const s = $('#speak span'); if (s) s.textContent = 'Leer en voz alta';
}
function toggleSpeak(v) {
  if (speaking) return stopSpeak();
  const p = $('[data-panel]:not([hidden])', v), c = p ? p.cloneNode(true) : null;
  if (c) $$('pre,.copy', c).forEach(x => x.remove());
  const txt = [$('h2', v).textContent, $('.lead', v).textContent, c ? c.textContent : ''].join('. ').replace(/\s+/g, ' ');
  const parts = txt.match(/[^.!?:;]+[.!?:;]?/g) || [];
  const voice = speechSynthesis.getVoices().find(x => /^es/i.test(x.lang));
  speaking = true; $('#speak span').textContent = 'Detener lectura';
  parts.forEach((t, n) => {
    const u = new SpeechSynthesisUtterance(t.trim()); u.lang = voice ? voice.lang : 'es-MX'; if (voice) u.voice = voice;
    if (n === parts.length - 1) u.onend = stopSpeak;
    speechSynthesis.speak(u);
  });
}

/* --- Buscador inteligente: índice de todo el contenido --- */
const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');   // sin acentos
const strip = h => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent.replace(/\s+/g, ' ').trim(); };
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const IDX = [];
S.forEach((d, i) => {
  IDX.push({ s: i, k: -1, t: d.t, x: d.lead });
  d.tabs.forEach((t, n) => IDX.push({ s: i, k: n, t: t[0], x: strip(t[1]) }));
  d.flow.forEach((f, n) => IDX.push({ s: i, k: 'f', n, t: 'Diagrama: ' + f[0], x: f[1] }));
  d.acc.forEach((a, n) => IDX.push({ s: i, k: 'a', n, t: a[0], x: a[1] }));
});
Object.keys(TERMS).forEach(k => IDX.push({ s: -1, term: k, t: k, x: TERMS[k] }));
IDX.forEach(r => { r.h = norm(r.t + ' ' + r.x); r.nt = norm(r.t); });

function hl(text, ws) {                                // resalta las palabras buscadas
  const n = norm(text), m = new Array(text.length).fill(0);
  ws.forEach(w => { let p = n.indexOf(w); while (p >= 0) { for (let j = p; j < p + w.length; j++) m[j] = 1; p = n.indexOf(w, p + w.length); } });
  let o = '', on = 0;
  for (let i = 0; i < text.length; i++) { if (m[i] && !on) { o += '<mark>'; on = 1; } if (!m[i] && on) { o += '</mark>'; on = 0; } o += esc(text[i]); }
  return o + (on ? '</mark>' : '');
}
function snip(r, ws) {
  const n = norm(r.x); let p = Math.min(...ws.map(w => { const i = n.indexOf(w); return i < 0 ? 1e9 : i; })); if (p === 1e9) p = 0;
  const a = Math.max(0, p - 45);
  return (a ? '… ' : '') + r.x.slice(a, a + 150) + (a + 150 < r.x.length ? ' …' : '');
}
function vis() {                                       // qué sección se muestra
  const q = $('#q').value.trim();
  $('#results').hidden = !q; $('#home').hidden = !!q || cur >= 0; $('#view').hidden = !!q || cur < 0;
}
function search() {
  const q = $('#q').value.trim(); $('#qc').hidden = !q; vis();
  const R = $('#results'); if (!q) { R.innerHTML = ''; return; }
  const ws = norm(q).split(/\s+/).filter(Boolean);
  const hits = IDX.filter(r => ws.every(w => r.h.includes(w)))
    .map(r => ({ r, sc: ws.reduce((a, w) => a + (r.nt.includes(w) ? 3 : 0), 0) + (r.term ? 2 : 0) }))
    .sort((a, b) => b.sc - a.sc).slice(0, 40).map(h => h.r);
  if (!hits.length) {
    R.innerHTML = `<div class="card empty">${icon('search')}<h2>No encontramos resultados</h2><p>No hay coincidencias para «${esc(q)}». Prueba con otra palabra (por ejemplo: Git, SQLite, sensor, notificación) o revisa la ortografía.</p><div class="row"><button class="btn" id="clr" type="button">Limpiar búsqueda</button><button class="btn alt" id="rand2" type="button">${icon('dice')} Tema aleatorio</button></div></div>`;
    return;
  }
  const groups = [...new Set(hits.map(r => r.s))].sort((a, b) => (a < 0) - (b < 0) || a - b);
  R.innerHTML = `<h2>Resultados para «${esc(q)}»</h2><p class="fcount">${hits.length} resultado${hits.length > 1 ? 's' : ''} en ${groups.length} ${groups.length > 1 ? 'secciones' : 'sección'}.</p>` +
    groups.map(g => `<h3>${g < 0 ? icon('book') + ' Glosario' : icon(TOPIC_ICONS[g]) + ' ' + (g + 1) + '. ' + S[g].t}</h3><ul class="rl">${hits.filter(r => r.s === g).map(r => `<li><button type="button" class="res" data-i="${IDX.indexOf(r)}"><b>${hl(r.t, ws)}</b><span>${hl(snip(r, ws), ws)}</span></button></li>`).join('')}</ul>`).join('');
}
const clearQ = () => { $('#q').value = ''; search(); };
let pending = null;                                    // resultado que se debe abrir tras cambiar de apartado
function applyPending() {
  if (!pending || pending.s !== cur) return;
  const r = pending, v = $('#view'); pending = null; let el;
  if (typeof r.k === 'number' && r.k >= 0) { $(`[data-tab="${r.k}"]`, v).click(); el = $(`[data-panel="${r.k}"]`, v); }
  else if (r.k === 'f') { $$('.node', v)[r.n].click(); el = $('.flow', v); }
  else if (r.k === 'a') { el = $$('details', v)[r.n]; el.open = true; }
  if (el) setTimeout(() => el.scrollIntoView({ block: 'start', behavior: P.nm ? 'auto' : 'smooth' }), 60);
}
function openResult(i) {
  const r = IDX[i]; clearQ();
  if (r.term) { $('#dt').textContent = r.term; $('#dd').textContent = TERMS[r.term]; $('#dlg').showModal(); return; }
  pending = r; if (cur === r.s) applyPending(); else go(r.s);
}
$('#sf .si').innerHTML = icon('search'); $('#qc').innerHTML = icon('x');
$('#q').addEventListener('input', search);
$('#q').addEventListener('keydown', e => { if (e.key === 'Escape') clearQ(); });
$('#qc').onclick = () => { clearQ(); $('#q').focus(); };
$('#results').addEventListener('click', e => {
  const b = e.target.closest('.res'); if (b) return openResult(+b.dataset.i);
  if (e.target.closest('#clr')) { clearQ(); $('#q').focus(); }
  if (e.target.closest('#rand2')) rnd();
});
document.addEventListener('keydown', e => {            // «/» enfoca el buscador
  if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); $('#q').focus(); }
});
$('#nav').addEventListener('click', () => { if ($('#q').value) clearQ(); });

/* --- Inicio: destacados, filtros por categoría y tema aleatorio --- */
$('#feat').innerHTML = FEAT.map(([n, why]) => `<button class="card feat-card" data-go="${n}"><span class="badge">${icon('star')} Recomendado</span><h4>${icon(TOPIC_ICONS[n])} ${S[n].t}</h4><p>${why}</p></button>`).join('');
$$('#feat [data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
let flt = 'all';
function chips() {
  $('#chips').innerHTML = ['all', ...Object.keys(CATS)].map(k => `<button type="button" class="chip" data-f="${k}" aria-pressed="${k === flt}">${k === flt ? icon('check') : ''}${k === 'all' ? 'Todos' : CATS[k]}</button>`).join('');
  let c = 0;
  $$('#topics .card').forEach((el, n) => { const show = flt === 'all' || CAT_OF[n] === flt; el.hidden = !show; if (show) c++; });
  $('#fcount').textContent = `Mostrando ${c} de 7 temas`;
}
$('#chips').addEventListener('click', e => { const b = e.target.closest('.chip'); if (b) { flt = b.dataset.f; chips(); $(`.chip[data-f="${flt}"]`).focus(); } });
chips();
function rnd() { if ($('#q').value) clearQ(); let n; do n = Math.floor(Math.random() * 7); while (n === cur); go(n); }
$('#rand').innerHTML = icon('dice') + '<span>Abrir un tema aleatorio</span>';
$('#rand').onclick = rnd;

/* --- Accesibilidad y apariencia (se guarda en el navegador) --- */
let P = { theme: 'dark', fs: 1, hc: false, nm: matchMedia('(prefers-reduced-motion: reduce)').matches };
try { Object.assign(P, JSON.parse(localStorage.getItem('prefs')) || {}); } catch (e) { /* sin almacenamiento */ }
function applyPrefs() {
  const r = document.documentElement;
  r.dataset.theme = P.theme; r.dataset.contrast = P.hc ? 'high' : 'normal'; r.dataset.motion = P.nm ? 'off' : 'on';
  r.style.setProperty('--fs', P.fs);
  $('#fsv').textContent = Math.round(P.fs * 100) + '%'; $('#hc').checked = P.hc; $('#nm').checked = P.nm;
  $$('[data-theme]', $('#a11y')).forEach(b => b.setAttribute('aria-pressed', b.dataset.theme === P.theme));
  try { localStorage.setItem('prefs', JSON.stringify(P)); } catch (e) { /* ignorar */ }
}
$('#a11yBtn').innerHTML = icon('access');
$('#a11yBtn').onclick = () => $('#a11y').showModal();
$('#a11yx').onclick = () => $('#a11y').close();
$('#a11y').addEventListener('click', e => { if (e.target.id === 'a11y') e.target.close(); });
$$('[data-theme]', $('#a11y')).forEach(b => b.onclick = () => { P.theme = b.dataset.theme; applyPrefs(); });
$('#fsp').onclick = () => { P.fs = Math.min(1.6, +(P.fs + .1).toFixed(1)); applyPrefs(); };
$('#fsm').onclick = () => { P.fs = Math.max(.8, +(P.fs - .1).toFixed(1)); applyPrefs(); };
$('#fsr').onclick = () => { P.fs = 1; applyPrefs(); };
$('#hc').onchange = e => { P.hc = e.target.checked; applyPrefs(); };
$('#nm').onchange = e => { P.nm = e.target.checked; applyPrefs(); };
applyPrefs();

addEventListener('hashchange', route);
route();
