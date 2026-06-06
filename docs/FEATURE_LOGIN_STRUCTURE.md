# Feature And Login Structure

This document describes the current VendorBridge feature structure and the recommended login/access model.

## User Roles

| Role | Purpose |
| --- | --- |
| Admin | Full system control, user/vendor/RFQ/approval/PO/invoice/audit/analytics access. |
| Manager | Reviews and approves procurement work, manages POs/invoices, sees analytics and audit logs. |
| Procurement Officer | Creates and manages vendors and RFQs, reviews quotations, handles daily procurement flow. |
| Vendor | Views assigned RFQs and submits quotations. |

## Login Flow

1. User opens `/login`.
2. Frontend sends credentials to `POST /api/v1/auth/login`.
3. Backend validates email/password.
4. Backend returns:
   - `accessToken`
   - `refreshToken`
   - `user`
5. Frontend stores:
   - `vb_access_token`
   - `vb_refresh_token`
   - `vb_user`
6. Every API request sends:
   - `Authorization: Bearer <accessToken>`
7. Protected pages should verify the token by calling `GET /api/v1/auth/me`.
8. Logout should call `POST /api/v1/auth/logout`, then clear local storage.

## Auth API

| Method | Endpoint | Use |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Create user account. |
| POST | `/api/v1/auth/login` | Login and receive tokens. |
| POST | `/api/v1/auth/refresh` | Refresh expired access token. |
| GET | `/api/v1/auth/me` | Get current logged-in user. |
| POST | `/api/v1/auth/logout` | Revoke refresh token and logout. |
| PATCH | `/api/v1/auth/change-password` | Change logged-in user's password. |

## Frontend Pages

| Page | Route | Main Users |
| --- | --- | --- |
| Login | `/login` | All users |
| Dashboard | `/dashboard` | Admin, Manager, Procurement Officer |
| Vendors | `/vendors` | Admin, Manager, Procurement Officer, Vendor view-only own record |
| RFQs | `/rfqs` | Admin, Manager, Procurement Officer, Vendor |
| Quotations | `/quotations` | Admin, Manager, Procurement Officer, Vendor |
| Approvals | `/approvals` | Admin, Manager, Procurement Officer for create/view; Admin/Manager approve/reject |
| Purchase Orders | `/purchase-orders` | Admin, Manager, Procurement Officer for create/send; Admin/Manager complete/cancel |
| Invoices | `/invoices` | Admin, Manager, Procurement Officer for create/view; Admin/Manager generate/paid |
| Analytics | `/analytics` | Admin, Manager |
| Notifications | `/notifications` | All logged-in users |

## Backend Feature Modules

| Module | Base API | Responsibility |
| --- | --- | --- |
| Auth | `/api/v1/auth` | Register, login, refresh, logout, profile, password change. |
| Vendors | `/api/v1/vendors` | Vendor onboarding, status, verification, blacklist, profile management. |
| RFQs | `/api/v1/rfqs` | RFQ creation, update, open/close/cancel, assign/remove vendors. |
| Quotations | `/api/v1/quotations` | Vendor quotations, quotation review, select/reject. |
| Approvals | `/api/v1/approvals` | Approval requests and decisions. |
| Purchase Orders | `/api/v1/purchase-orders` | Create/send/complete/cancel purchase orders. |
| Invoices | `/api/v1/invoices` | Create/generate/mark-paid invoices. |
| Notifications | `/api/v1/notifications` | Send, list, and mark notifications as read. |
| Activity Logs | `/api/v1/activity-logs` | Audit trail for admin/manager. |

## Role Access Matrix

| Feature | Admin | Manager | Procurement Officer | Vendor |
| --- | --- | --- | --- | --- |
| Dashboard | Yes | Yes | Yes | Limited |
| User Management | Yes | Read only | No | No |
| Vendors | Full | Read/update | Create/read/update | Own vendor data only |
| RFQs | Full | Read/update | Create/read/update/open/close/assign | Read assigned RFQs |
| Quotations | Review/select/reject | Review/select/reject | Review/select/reject | Create/read own quotations |
| Approvals | Create/view/approve/reject | Create/view/approve/reject | Create/view | No |
| Purchase Orders | Create/send/complete/cancel | Create/send/complete/cancel | Create/send/view | No |
| Invoices | Create/generate/paid | Create/generate/paid | Create/view | No |
| Notifications | Create/read | Create/read | Read | Read |
| Activity Logs | Read | Read | Limited | No |
| Analytics | Yes | Yes | No | No |

## Recommended Frontend Guards

Add these guards around routes:

| Guard | Behavior |
| --- | --- |
| `RequireAuth` | If no valid token, redirect to `/login`. |
| `RequireRole` | If logged-in user role is not allowed, show forbidden page or redirect to dashboard. |
| `GuestOnly` | If already logged in, redirect from `/login` to `/dashboard`. |

Recommended route grouping:

```txt
/login
/dashboard
/vendors
/rfqs
/quotations
/approvals
/purchase-orders
/invoices
/analytics
/notifications
```

Recommended role landing pages:

| Role | After Login |
| --- | --- |
| Admin | `/dashboard` |
| Manager | `/dashboard` |
| Procurement Officer | `/rfqs` |
| Vendor | `/rfqs` |

## Implementation Notes

- The backend already protects most APIs with token and role middleware.
- The frontend currently stores tokens and sends the access token automatically through `frontend/src/api/client.js`.
- The next frontend improvement should be protected routes and role-based sidebar visibility.
- Keep API role checks in the backend even if the frontend hides pages.
