# .kiro Folder - Kiro Configuration

This folder contains Kiro-related configuration for the KiroCore project.

## 📁 Structure

```
.kiro/
├── steering/           # Project guidelines and standards
│   ├── product.md     # Product overview and concept
│   ├── structure.md   # Project structure and organization
│   └── tech.md        # Tech stack and dependencies
│
├── specs/             # Feature specifications
│   ├── kiro-cli-integration/
│   │   ├── requirements.md
│   │   ├── design.md
│   │   └── ARCHITECTURE.md
│   └── kirocore-platform/
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
│
├── hooks/             # Automation hooks
│   └── root-hook.ts  # Hook configurations
│
└── README.md         # This file
```

## 🎯 Purpose

### Steering Rules

Located in `steering/` folder, these files define:

- Product vision and features
- Project structure and file organization
- Tech stack and development standards

These rules are automatically included when Kiro generates code, ensuring consistency.

### Specs

Located in `specs/` folder, these contain:

- Feature requirements (EARS format)
- Technical design documents
- Implementation task lists

Use specs to plan and implement complex features systematically.

### Hooks

Located in `hooks/` folder, these define:

- Automation triggers (on save, on commit, etc.)
- Actions to run automatically
- Development workflow enhancements

## 🚀 Quick Start

### View Steering Rules

```bash
cat .kiro/steering/product.md
cat .kiro/steering/structure.md
cat .kiro/steering/tech.md
```

### View Specs

```bash
ls .kiro/specs/
cat .kiro/specs/kiro-cli-integration/requirements.md
```

### View Hooks

```bash
cat .kiro/hooks/root-hook.ts
```

## 📚 Documentation

For complete project documentation, see:

- Main README: `/README.md`
- Kiro Integration Guide: `/KIRO_INTEGRATION.md`
- Test Guide: `/TEST_KIRO_INTEGRATION.md`

## 🔧 Maintenance

Keep this folder clean and organized:

- Update steering rules when architecture changes
- Create specs for new features
- Add hooks for repetitive tasks
- Remove outdated files

---

**This folder demonstrates deep Kiro integration and professional project organization.** 🔮
