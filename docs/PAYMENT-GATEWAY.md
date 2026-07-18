# Payment Gateway Integration Guide

## Recommended Payment Gateways for South Africa

### 1. PayFast (Recommended)
**Best for:** Instant EFT, Credit Cards, Debit Cards, Mobicred

| Feature | Details |
|---------|---------|
| Setup Fee | FREE |
| Monthly Fee | FREE |
| Transaction Fee | 3.5% + R2.00 |
| Payouts | Daily (T+2) |
| Currencies | ZAR |
| Integration | API, SDK, Redirect |

**Pros:**
- Most popular in SA
- No monthly fees
- Instant EFT support
- Good documentation
- Sandbox for testing

**Cons:**
- ZAR only
- 2-day settlement

### 2. Yoco
**Best for:** Credit/Debit Cards, Online Payments

| Feature | Details |
|---------|---------|
| Setup Fee | FREE |
| Monthly Fee | FREE |
| Transaction Fee | 2.95% (cards) |
| Payouts | Next business day |
| Currencies | ZAR |
| Integration | API, SDK, Redirect |

**Pros:**
- Lower card fees
- Next-day payouts
- Modern API
- Good for subscriptions

**Cons:**
- Cards only (no EFT)
- Higher fees for small transactions

### 3. Stripe (International)
**Best for:** International payments, Subscriptions

| Feature | Details |
|---------|---------|
| Setup Fee | FREE |
| Monthly Fee | FREE |
| Transaction Fee | 3.5% + R3.00 |
| Payouts | 7-day rolling |
| Currencies | Multi-currency |
| Integration | API, SDK |

**Pros:**
- Multi-currency
- Best subscription support
- Excellent API
- Global reach

**Cons:**
- Higher fees in SA
- 7-day settlement
- No Instant EFT

---

## Cost Comparison (R10,000 transaction)

| Gateway | Fee | You Receive |
|---------|-----|-------------|
| PayFast | R352 | R9,648 |
| Yoco | R295 | R9,705 |
| Stripe | R353 | R9,647 |

## Recommendation

**Start with PayFast** (most popular in SA, free setup, Instant EFT)
**Add Yoco later** (lower card fees for repeat customers)

---

## Integration Architecture

```
Customer → Cart → Checkout → Payment Gateway → Webhook → Order Update
                                    ↓
                              Redirect to:
                              - Success page
                              - Cancel page
                              - Notify webhook
```

## Webhook Events to Handle

1. `payment_complete` - Update order to paid
2. `payment_failed` - Mark order as failed
3. `refund_complete` - Process refund
4. `subscription_renewed` - Renew subscription
