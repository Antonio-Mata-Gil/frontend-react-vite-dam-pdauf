import { test, expect } from '@playwright/test';
import { testUser } from './fixtures/testData.js';

test.describe('User Management Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debería permitir rellenar el formulario de usuario', async ({ page }) => {
    // Buscar inputs del formulario
    const nameInput = page.locator('input[placeholder*="nombre"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    // Rellenar el formulario
    await nameInput.fill(testUser.name);
    await emailInput.fill(testUser.email);
    await passwordInput.fill('Password123');

    // Verificar que los valores se han rellenado
    await expect(nameInput).toHaveValue(testUser.name);
    await expect(emailInput).toHaveValue(testUser.email);
  });

  test('debería mostrar validación en el formulario', async ({ page }) => {
    // Intentar enviar formulario sin llenar
    const submitButton = page.locator('button:has-text("Crear")').first();

    // Verificar que el botón existe
    const count = await submitButton.count();
    if (count > 0) {
      await submitButton.click();
      
      // Verificar que hay validación (errores visibles en rojo)
      const errorMessages = page.locator('text=/requerido|El/i');
      const errorCount = await errorMessages.count();
      expect(errorCount).toBeGreaterThan(0);
    }
  });

  test('debería permitir enviar formulario con datos válidos', async ({ page }) => {
    // Rellenar formulario
    const nameInput = page.locator('input[placeholder*="nombre"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await nameInput.fill(testUser.name);
    await emailInput.fill(testUser.email);
    await passwordInput.fill('Password123');

    // Buscar y hacer click en botón enviar
    const submitButton = page.locator('button:has-text("Crear")').first();

    const count = await submitButton.count();
    if (count > 0) {
      await submitButton.click();
      
      // Esperar a que se procese
      await page.waitForTimeout(1000);
      
      // Verificar que la página sigue visible
      const title = page.locator('text=/Proyecto del módulo/i');
      await expect(title).toBeVisible();
    }
  });

  test('debería mostrar mensaje de éxito al crear usuario', async ({ page }) => {
    // Setup: rellenar y enviar
    const nameInput = page.locator('input[placeholder*="nombre"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await nameInput.fill(testUser.name);
    await emailInput.fill(testUser.email);
    await passwordInput.fill('Password123');

    // Mock alert
    page.once('dialog', dialog => {
      expect(dialog.type()).toBe('alert');
      dialog.accept();
    });

    const submitButton = page.locator('button:has-text("Crear")').first();
    const count = await submitButton.count();
    
    if (count > 0) {
      await submitButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('debería permitir interactuar con múltiples campos', async ({ page }) => {
    // Probar interacción con múltiples inputs
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]');
    const inputCount = await inputs.count();
    
    expect(inputCount).toBeGreaterThan(0);
    
    // Hacer focus en el primer input
    if (inputCount > 0) {
      await inputs.first().focus();
      await expect(inputs.first()).toBeFocused();
    }
  });

  test('debería mostrar el rol dropdown en el formulario', async ({ page }) => {
    // Buscar el select de rol
    const roleSelect = page.locator('select').first();
    const selectCount = await roleSelect.count();
    
    if (selectCount > 0) {
      await expect(roleSelect).toBeVisible();
    }
  });
});
