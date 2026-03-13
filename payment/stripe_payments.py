from __future__ import annotations

import os

import stripe

from backend.logging_utils import getLogger  # adjust import to where your logger lives

logger = getLogger(__name__)

STRIPE_API_KEY = os.environ.get("STRIPE_SECRET_KEY", "")
if STRIPE_API_KEY:
    stripe.api_key = STRIPE_API_KEY
else:
    logger.warning("STRIPE_SECRET_KEY is not set; Stripe payments are disabled.")

TIER_TO_PAYMENT_LINK: dict[str, str] = {
    "basic": "https://dashboard.stripe.com/acct_1SiHqC2KmpnVwTx7/payment-links/plink_1SiOvb2KmpnVwTx7bwHGn1x7",
    "starter-miner": "https://dashboard.stripe.com/acct_1SiHqC2KmpnVwTx7/payment-links/plink_1SiMJM2KmpnVwTx7zDs50L6O",
    "elite-miner": "https://dashboard.stripe.com/acct_1SiHqC2KmpnVwTx7/payment-links/plink_1SiOxU2KmpnVwTx76cxN728h",
    "plus": "https://dashboard.stripe.com/acct_1SiHqC2KmpnVwTx7/payment-links/plink_1SiOwD2KmpnVwTx7tLxc34UA",
}


def get_stripe_checkout_url(tier_id: str) -> str | None:
    url = TIER_TO_PAYMENT_LINK.get(tier_id)
    if url is None:
        logger.warning("Unknown tier_id requested for Stripe checkout", extra={"tier_id": tier_id})
    else:
        logger.info("Providing Stripe Payment Link", extra={"tier_id": tier_id})
    return url
