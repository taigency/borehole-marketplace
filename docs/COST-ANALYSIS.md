# BoreHub - Cost Analysis & Pricing Model

## Monthly Hosting Costs

### Vercel Hosting

| Plan | Cost | Features |
|------|------|----------|
| **Hobby (Dev)** | FREE | 100GB bandwidth, personal use |
| **Pro (Prod)** | $20/user/mo | 1TB bandwidth, team, analytics |
| **Enterprise** | Custom | Unlimited, SLA, support |

**Recommendation:** Start with Pro ($20/month)

### Supabase Database

| Plan | Cost | Features |
|------|------|----------|
| **Free (Dev)** | FREE | 500MB DB, 1GB storage, 50K rows |
| **Pro (Prod)** | $25/month | 8GB DB, 100GB storage, unlimited rows |
| **Team** | $599/month | Unlimited, SOC2, priority support |

**Recommendation:** 
- Dev: Free tier
- Beta: Free tier  
- Prod: Pro tier ($25/month)

### Domain & DNS

| Item | Cost |
|------|------|
| Domain (borehub.co.za) | R100/year (~R8/month) |
| Cloudflare DNS | FREE |
| SSL Certificate | FREE (included with Vercel) |

### Email Service

| Service | Cost |
|---------|------|
| SendGrid (Free) | 100 emails/day FREE |
| SendGrid (Pro) | $19.95/month (50K emails) |
| AWS SES | $0.10/1000 emails |

**Recommendation:** Start with SendGrid Free, upgrade as needed

---

## Total Monthly Costs

### Development Phase (Months 1-3)

| Item | Monthly Cost |
|------|--------------|
| Vercel (Hobby) | FREE |
| Supabase (Free) | FREE |
| Domain | R8 |
| SendGrid (Free) | FREE |
| **Total** | **R8/month** |

### Beta Phase (Months 4-6)

| Item | Monthly Cost |
|------|--------------|
| Vercel (Pro) | R380 (~$20) |
| Supabase (Free) | FREE |
| Domain | R8 |
| SendGrid (Free) | FREE |
| **Total** | **R388/month** |

### Production Phase (Months 7+)

| Item | Monthly Cost |
|------|--------------|
| Vercel (Pro) | R380 |
| Supabase (Pro) | R475 (~$25) |
| Domain | R8 |
| SendGrid (Pro) | R380 (~$20) |
| Monitoring (Sentry) | FREE |
| **Total** | **R1,243/month** |

### Growth Phase (1000+ users)

| Item | Monthly Cost |
|------|--------------|
| Vercel (Pro) | R380 |
| Supabase (Pro) | R475 |
| Domain | R8 |
| SendGrid (Pro) | R380 |
| Monitoring | R190 |
| Support tools | R190 |
| **Total** | **R1,623/month** |

---

## Revenue Model

### Commission-Based Revenue

| Transaction Value | Commission (10%) | Monthly (100 orders) |
|-------------------|------------------|---------------------|
| R5,000 | R500 | R50,000 |
| R10,000 | R1,000 | R100,000 |
| R20,000 | R2,000 | R200,000 |

### Subscription Revenue

| Tier | Price | Target (Month 6) | Revenue |
|------|-------|------------------|---------|
| Free | R0 | 100 suppliers | R0 |
| Basic | R500/month | 30 suppliers | R15,000 |
| Premium | R2,000/month | 10 suppliers | R20,000 |
| **Total** | | | **R35,000/month** |

### Lead Fee Revenue

| Lead Price | Leads/Month | Revenue |
|------------|-------------|---------|
| R200 | 200 | R40,000 |

---

## Pricing Strategy

### For Suppliers

| Feature | Free | Basic (R500/mo) | Premium (R2,000/mo) |
|---------|------|-----------------|---------------------|
| Product listings | 10 | 50 | Unlimited |
| Lead notifications | Email | Email + SMS | Priority |
| Analytics | Basic | Advanced | Full + Export |
| Featured listing | No | Category | Homepage |
| Support | Community | Email | Priority phone |
| Commission | 10% | 8% | 5% |

### For Service Providers

| Feature | Free | Basic (R300/mo) | Premium (R1,500/mo) |
|---------|------|-----------------|---------------------|
| Service listings | 3 | 10 | Unlimited |
| Lead access | Limited | Full | Priority |
| Coverage areas | 1 province | 3 provinces | All |
| Analytics | Basic | Advanced | Full |
| Commission | 12% | 10% | 7% |

### For Customers

| Feature | Free |
|---------|------|
| Browse marketplace | Yes |
| Post requirements | Yes |
| Get quotes | Yes |
| Place orders | Yes |
| Order tracking | Yes |
| Support | Community |

---

## Break-Even Analysis

### Monthly Fixed Costs: ~R1,500

### Revenue Needed to Break Even

| Scenario | Orders | Avg Order | Commission | Revenue |
|----------|--------|-----------|------------|---------|
| Conservative | 50 | R5,000 | 10% | R25,000 |
| Moderate | 100 | R8,000 | 10% | R80,000 |
| Optimistic | 200 | R10,000 | 10% | R200,000 |

### Break-Even Timeline

| Month | Users | Orders | Revenue | Costs | Profit |
|-------|-------|--------|---------|-------|--------|
| 1 | 50 | 10 | R5,000 | R400 | R4,600 |
| 3 | 200 | 50 | R25,000 | R1,500 | R23,500 |
| 6 | 500 | 150 | R75,000 | R1,600 | R73,400 |
| 12 | 2000 | 500 | R250,000 | R2,000 | R248,000 |

---

## Selling Price for Hosting

### If Selling as SaaS to Clients

| Package | Setup Fee | Monthly Fee | Includes |
|---------|-----------|-------------|----------|
| Starter | R5,000 | R999/month | Basic marketplace, 50 suppliers |
| Business | R15,000 | R2,999/month | Full marketplace, 200 suppliers |
| Enterprise | R50,000 | R9,999/month | Custom, unlimited, API access |

### If White-Labeling for Other Industries

| License | Price | Includes |
|---------|-------|----------|
| Single use | R50,000 | One industry, source code |
| Multi use | R150,000 | Multiple industries |
| Enterprise | R500,000 | Full customization, support |

---

## Recommendation

1. **Start lean** - Use free tiers for dev/beta
2. **Launch with PayFast** - No monthly fees, pay per transaction
3. **Scale infrastructure** - Upgrade as revenue grows
4. **Target break-even** by month 3
5. **Price commission at 10%** - Industry standard
6. **Offer subscriptions** - Recurring revenue for stability
