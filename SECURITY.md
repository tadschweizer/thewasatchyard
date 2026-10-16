# Site security and recovery

This is a static race-information website on GitHub Pages. Registration and payment take place on UltraSignup; contact messages go directly to Formspree. Do not put passwords, API secrets, private runner information, or payment details in this public repository.

## Implemented in the site

- Every HTML page delivers a Content Security Policy before loading resources. Scripts are limited to this site, with the existing Strava embed loader allowed only on the course page. Inline executable scripts, plugins, arbitrary network requests, and base-URL overrides are blocked.
- Form submissions are limited to HTTPS Formspree. The existing spam-trap field is preserved. This does not prevent bots from submitting directly to Formspree.
- The course page alone allows Strava frames and inline styles needed by the existing embed. Other pages do not allow frames or inline styles.
- A referrer policy avoids sending full page paths to other websites. External new-tab links retain `noopener`.
- Pull requests run dependency-free static security checks. The checkout action is pinned to a commit and does not persist its credentials.
- An hourly GitHub Actions availability check verifies the homepage, the current registration link, the CSP marker, and the shared script. It makes ordinary requests, not load tests.

## Hosting limitations

GitHub Pages supplies HTTPS and CDN delivery. The HTML policy is browser hardening, not DDoS protection. This release does not add Cloudflare, a custom firewall, or a guarantee against outages.

GitHub Pages does not provide custom response-header configuration here. `frame-ancestors`, `X-Frame-Options`, `X-Content-Type-Options`, and Permissions Policy must be added through a suitable proxy or hosting service if needed. Do not place them in HTML meta tags and claim that they work. In particular, the site's CSP does not prevent another site from framing this site.

Keep GitHub hosting for this small pointer site unless real traffic or abuse warrants an additional service. Cloudflare is a possible later option; proxying this domain would not protect Formspree or UltraSignup directly, and GitHub's origin remains publicly reachable.

## Account controls to verify

These settings live outside the repository. Their presence in this checklist does not mean they are enabled.

1. GitHub personal Settings > Pages: finish verification of `wasatchyard.com`, and retain the DNS TXT record. Adding the domain without completing DNS verification is not protection.
2. Repository Settings > Rules > Rulesets: protect the default branch, require pull requests, block force pushes and deletion, and require resolved conversations. Zero required approvals is appropriate for a sole maintainer who must be able to merge their own changes. Once the security check has run, require `Static site security` as well.
3. Enable two-factor authentication on GitHub, the domain provider, and the recovery email account. Keep recovery codes somewhere private and secure.
4. In the domain provider, verify domain auto-renewal, correct recovery details, and transfer lock. Avoid wildcard DNS records pointing at GitHub Pages.
5. In Formspree, verify spam filtering/CAPTCHA and submission quota. Do not disable the spam trap. Confirm a real enquiry reaches the intended inbox after changing provider settings.
6. GitHub Settings > Notifications: enable the desired Actions failure notifications. The availability workflow alone does not prove email delivery. Scheduled runs can be delayed, and public repositories' schedules may be disabled after 60 days without activity. Use an independent uptime service if timely outage alerts become essential.

## Verify a change

From the repository folder, run `node scripts/check-security.mjs` with Node.js installed. Then check all six pages in a browser, including mobile navigation, the photo gallery, and the Strava map. When changing the race registration URL, update the expected URL in both security and availability checks.

The October 2026 hardening was tested in Chromium on all six local pages. Mobile navigation and the gallery worked, no ordinary top-page CSP violations occurred, an injected inline script and an unauthorized form destination were blocked, and a mocked Formspree POST was permitted. The mocked submission did not send an email and does not establish inbox delivery.

## If the website goes down

1. Use the direct registration link: https://ultrasignup.com/register.aspx?did=138776. Keep it and the race guide in your race communications so runners do not depend on this website.
2. Check https://www.githubstatus.com/ and this repository's Actions tab. The hourly availability workflow records failures there.
3. If an update caused the problem, revert that specific pull request using GitHub's Revert button, merge the resulting revert pull request, and wait for Pages deployment. Verify the homepage and registration link afterward. Do not force-push over history.
4. If content or DNS was changed without permission, secure the GitHub, domain-provider, and recovery-email accounts first, review access and recent activity, then restore the known-good version.
