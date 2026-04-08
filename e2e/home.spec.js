import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('debería cargar la página home', async ({ page }) => {
    // Verificar que el título está presente
    const title = page.locator('text=/Proyecto del módulo de programación/i');
    await expect(title).toBeVisible();
  });

  test('debería mostrar credenciales del usuario', async ({ page }) => {
    // Verificar que las credenciales se muestran
    const credentials = page.locator('text=/Usuario: Antonio López/i');
    await expect(credentials).toBeVisible();
  });

  test('debería mostrar lista de usuarios', async ({ page }) => {
    // Verificar que la sección de usuarios existe
    const usersSection = page.locator('text=/Listado de usuarios|Lista de Usuarios/i');
    await expect(usersSection).toBeVisible();
  });

  test('debería mostrar formulario de creación', async ({ page }) => {
    // Buscar el formulario de creación de usuarios
    const form = page.locator('text=/Formulario de creación/i');
    await expect(form).toBeVisible();
  });

  test('debería tener inputs de nombre, email y contraseña', async ({ page }) => {
    // Verificar que los campos del formulario existen
    const nameInput = page.locator('input[placeholder*="nombre"]').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });
});

test.describe('Responsiveness', () => {
  test('debería verse bien en pantalla mobile', async ({ page }) => {
    // Simular viewport mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const title = page.locator('text=/Proyecto del módulo/i');
    await expect(title).toBeVisible();
  });

  test('debería verse bien en pantalla desktop', async ({ page }) => {
    // Simular viewport desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('/');
    
    const title = page.locator('text=/Proyecto del módulo/i');
    await expect(title).toBeVisible();
  });
});
