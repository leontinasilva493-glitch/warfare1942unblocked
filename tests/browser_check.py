import os
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE_URL = os.environ.get("SITE_PREVIEW_URL", "http://127.0.0.1:4567").rstrip("/")
ROUTES = [
    "/",
    "/promo-codes/",
    "/download/",
    "/how-to-play/",
    "/multiplayer/",
    "/unblocked/",
    "/chromebook/",
    "/privacy/",
    "/contact/",
]
IFRAME_URL = "https://www.gamezhero.com/get-game-code/cd49f7f7616e5661b97901dc688b4385"
ARTIFACTS = Path("artifacts/qa")


def assert_routes(page):
    for route in ROUTES:
        response = page.goto(f"{BASE_URL}{route}", wait_until="domcontentloaded", timeout=60_000)
        assert response is not None and response.status == 200, f"{route} returned {response.status if response else 'no response'}"
        page.locator("h1").first.wait_for(state="visible")
        overflow = page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
        assert overflow <= 1, f"{route} has {overflow}px horizontal overflow"


def assert_home_interactions(page):
    page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60_000)
    iframe = page.locator(f'iframe[src="{IFRAME_URL}"]')
    assert iframe.count() == 1, "homepage must render the exact public game frame"
    iframe.wait_for(state="visible")
    page.locator("[data-game-loading]").wait_for(state="hidden", timeout=60_000)
    assert any(frame.url.startswith(IFRAME_URL) for frame in page.frames), "public game frame did not navigate to the embed URL"

    save = page.locator("[data-save-page]")
    save.click()
    assert save.get_attribute("aria-pressed") == "true"
    assert save.inner_text() == "Saved"
    save.click()
    assert save.get_attribute("aria-pressed") == "false"


def assert_mobile_menu(page):
    page.goto(BASE_URL, wait_until="domcontentloaded", timeout=60_000)
    menu_button = page.get_by_role("button", name="Menu")
    menu_button.click()
    assert menu_button.get_attribute("aria-expanded") == "true"
    assert page.locator("[data-primary-nav]").evaluate("node => node.classList.contains('is-open')")


def assert_chromebook_page(page):
    page.goto(f"{BASE_URL}/chromebook/", wait_until="domcontentloaded", timeout=60_000)
    page.get_by_role("heading", name="Warfare 1942 on Chromebook: Play in Your Browser").wait_for(state="visible")
    assert page.locator(f'iframe[src="{IFRAME_URL}"]').count() == 1
    assert page.get_by_role("link", name="Back to the main guide").get_attribute("href") == "/"
    assert page.get_by_text("This guide does not provide proxies, VPNs, or bypass methods.", exact=False).is_visible()


def assert_search_intent_pages(page, viewport_label):
    page.goto(f"{BASE_URL}/how-to-play/", wait_until="domcontentloaded", timeout=60_000)
    page.get_by_role("heading", name="Warfare 1942 Beginner Guide: How to Play").wait_for(state="visible")
    assert page.get_by_role("link", name="Watch the Warfare 1942 gameplay video on YouTube").get_attribute("href") == "https://www.youtube.com/watch?v=8XhZIrXphYM"
    page.screenshot(path=str(ARTIFACTS / f"how-to-play-{viewport_label}.png"), full_page=True)

    page.goto(f"{BASE_URL}/unblocked/", wait_until="domcontentloaded", timeout=60_000)
    assert page.get_by_role("link", name="Open Warfare 1942 on Playgama").get_attribute("href") == "https://playgama.com/game/warfare-1942"
    page.screenshot(path=str(ARTIFACTS / f"unblocked-{viewport_label}.png"), full_page=True)

    page.goto(f"{BASE_URL}/multiplayer/", wait_until="domcontentloaded", timeout=60_000)
    page.get_by_role("heading", name="Warfare 1942 Multiplayer Modes and Guide").wait_for(state="visible")
    assert page.get_by_text("Map names and a best-map ranking are not independently verified", exact=False).is_visible()
    page.screenshot(path=str(ARTIFACTS / f"multiplayer-{viewport_label}.png"), full_page=True)


def main():
    ARTIFACTS.mkdir(parents=True, exist_ok=True)
    first_party_errors = []
    third_party_errors = []

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        desktop = browser.new_context(viewport={"width": 1440, "height": 1000})
        page = desktop.new_page()

        def capture_console(message):
            if message.type != "error":
                return
            location = message.location.get("url", "") if message.location else ""
            if location == f"{BASE_URL}/route-that-does-not-exist" and "404" in message.text:
                return
            record = f"{location}: {message.text}"
            if location.startswith(BASE_URL) or not location:
                first_party_errors.append(record)
            else:
                third_party_errors.append(record)

        page.on("console", capture_console)
        page.on("pageerror", lambda error: first_party_errors.append(str(error)))

        assert_routes(page)
        assert_home_interactions(page)
        page.screenshot(path=str(ARTIFACTS / "home-desktop.png"), full_page=True)
        assert_chromebook_page(page)
        assert_search_intent_pages(page, "desktop")
        page.screenshot(path=str(ARTIFACTS / "chromebook-desktop.png"), full_page=True)

        response = page.goto(f"{BASE_URL}/route-that-does-not-exist", wait_until="domcontentloaded")
        assert response is not None and response.status == 404, "unknown route must return HTTP 404"
        page.goto(f"{BASE_URL}/404.html", wait_until="domcontentloaded")
        assert page.get_by_role("heading", name="Mission route not found").is_visible()

        mobile = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        mobile_page = mobile.new_page()
        assert_mobile_menu(mobile_page)
        overflow = mobile_page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
        assert overflow <= 1, f"mobile homepage has {overflow}px horizontal overflow"
        mobile_page.screenshot(path=str(ARTIFACTS / "home-mobile.png"), full_page=True)
        assert_chromebook_page(mobile_page)
        assert_search_intent_pages(mobile_page, "mobile")
        overflow = mobile_page.evaluate("document.documentElement.scrollWidth - window.innerWidth")
        assert overflow <= 1, f"mobile Chromebook page has {overflow}px horizontal overflow"
        mobile_page.screenshot(path=str(ARTIFACTS / "chromebook-mobile.png"), full_page=True)

        mobile.close()
        desktop.close()
        browser.close()

    assert not first_party_errors, "First-party browser errors:\n" + "\n".join(first_party_errors)
    print(f"Checked {len(ROUTES)} routes, 404 behavior, player iframe, save interaction, Chromebook page, mobile menu, and overflow.")
    print(f"Third-party console errors observed: {len(third_party_errors)}")
    for error in third_party_errors[:10]:
        print(f"THIRD_PARTY: {error}")


if __name__ == "__main__":
    main()
