# 🎭 Playwright E2E Testing

Configuración de tests End-to-End (E2E) con Playwright para tu proyecto React.

## 📋 Estructura

```
e2e/
├── home.spec.js              # Tests de la página Home
├── userManagement.spec.js    # Tests del flujo de creación de usuarios
└── fixtures/
    └── testData.js           # Datos de prueba compartidos
```

## 🚀 Comandos

### Ejecutar todos los tests
```bash
npm run e2e
```

### Ejecutar tests en modo headless (sin interfaz)
```bash
npm run e2e
```

### Ejecutar tests en modo visual (navegador abierto)
```bash
npm run e2e:headed
```

### Ejecutar tests con debugger
```bash
npm run e2e:debug
```

### Ejecutar tests en UI mode (interfaz visual interactiva)
```bash
npm run e2e:ui
```

### Ejecutar tests de un archivo específico
```bash
npx playwright test e2e/home.spec.js
```

### Ejecutar tests que coincidan con un patrón
```bash
npx playwright test --grep "debería permitir"
```

### Ejecutar en navegador específico
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## 📖 Configuración

El archivo `playwright.config.js` contiene:

- **testDir**: Ubicación de los tests (`e2e/**/*.spec.js`)
- **baseURL**: URL base para navegación (`http://localhost:3000`)
- **webServer**: Inicia automáticamente `npm run dev`
- **projects**: Prueba en Chromium, Firefox y Safari
- **timeout**: 30 segundos por test
- **trace**: Grabación de trazas en caso de fallo
- **screenshot**: Capturas de pantalla en caso de error

## 🧪 Escribir Tests

### Estructura básica

```javascript
import { test, expect } from '@playwright/test';

test.describe('Mi Suite', () => {
  test.beforeEach(async ({ page }) => {
    // Runs before each test
    await page.goto('/');
  });

  test('debería hacer algo', async ({ page }) => {
    // Arrange
    const input = page.locator('input[placeholder="Nombre"]');
    
    // Act
    await input.fill('John Doe');
    await page.click('button[type="submit"]');
    
    // Assert
    await expect(page.locator('text=Success')).toBeVisible();
  });
});
```

### Selectores comunes

```javascript
// Por placeholder
page.locator('input[placeholder="Email"]')

// Por texto
page.locator('text=Crear Usuario')
page.locator('button:has-text("Crear")')

// Por role
page.locator('[role="button"]')
page.locator('[role="main"]')

// Por clase
page.locator('.submit-btn')

// Combinados
page.locator('input[type="text"][placeholder*="Nombre"]')
```

### Acciones principales

```javascript
// Navegación
await page.goto('/');
await page.goBack();
await page.goForward();

// Interacción
await input.fill('valor');
await button.click();
await input.type('texto', { delay: 100 });
await page.selectOption('select', 'opción');

// Verificación
await expect(element).toBeVisible();
await expect(element).toHaveValue('texto');
await expect(input).toBeFocused();
await expect(page).toHaveURL('/home');

// Esperas
await page.waitForTimeout(1000);
await page.waitForSelector('.loading');
```

## 🔧 CI/CD Integration

Para ejecutar en CI (GitHub Actions, GitLab CI, etc.):

```yaml
- name: Run Playwright tests
  run: npm run e2e
```

Los tests se ejecutarán:
- En modo headless
- Con reintentosautomáticos (2 reintentos)
- Con máximo 1 worker (serial)
- Generando reportes HTML

## 📊 Reportes

Después de ejecutar los tests, abre el reporte:

```bash
npx playwright show-report
```

Acceso automático a:
- Video del test
- Trazas (trace)
- Capturas de pantalla
- Logs

## 🐛 Debugging

### Modo debug interactivo
```bash
npm run e2e:debug
```

### With UI mode (Inspeccionar paso a paso)
```bash
npm run e2e:ui
```

### Agregar puntos de parada en código
```javascript
await page.pause(); // Pausa la ejecución
```

## 📝 Tips y Buenas Prácticas

1. **Usa fixtures** para datos compartidos (`e2e/fixtures/testData.js`)
2. **BeforeEach** para setup común (navegación a página)
3. **Selectores robustos**: Prefiere `placeholder`, `role` antes de clases
4. **Esperas implícitas**: Playwright espera automáticamente
5. **Un assert por test**: No mezcles múltiples validaciones desconectadas
6. **Nombres descriptivos**: `debería permitir crear usuario` es mejor que `test 1`
7. **No uses sleep**: Usa `waitForSelector`, `waitForNavigation`, etc.

## ⚙️ Archivos de Configuración

### playwright.config.js
Configuración global de Playwright para todos los tests.

### e2e/home.spec.js
Tests de la página Home - carga, renderizado, responsive.

### e2e/userManagement.spec.js
Tests del flujo de creación de usuarios - formulario, validación, envío.

## 🔗 Recursos

- [Documentación oficial Playwright](https://playwright.dev/)
- [Guía de selectores](https://playwright.dev/docs/locators)
- [Best practices](https://playwright.dev/docs/best-practices)
- [Debugging guide](https://playwright.dev/docs/debug)
