import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

await page.goto('http://localhost:8080/realms/aspl-realm/protocol/openid-connect/auth?response_type=code&client_id=aspl-open-id&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code_challenge=UW0Eb3jCQySRSm6IYatJ1DfOG3EhgglgD-rdEW9uM90&code_challenge_method=S256&scope=profile+openid&state=customLoginState');
  
});