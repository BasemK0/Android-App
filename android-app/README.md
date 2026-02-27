# FaceVerse Editor — Android App (Kotlin)

A native Android rebuild of the FaceVerse Editor AI photo editing app, built with **Kotlin** and **Jetpack Compose**.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Kotlin | 2.0.0 | Primary language |
| Jetpack Compose | BOM 2024.12.01 | Declarative UI |
| Material3 | Latest | Design system |
| Navigation Compose | 2.8.5 | Screen navigation |
| Android SDK | 35 (min 26) | Platform |

## Project Structure

```
android-app/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml
│   │   ├── java/com/faceverse/editor/
│   │   │   ├── MainActivity.kt              # Entry point + bottom nav
│   │   │   ├── navigation/
│   │   │   │   └── NavGraph.kt              # Navigation routes
│   │   │   └── ui/
│   │   │       ├── theme/
│   │   │       │   ├── Color.kt             # Dark AI color palette
│   │   │       │   ├── Theme.kt             # Material3 dark theme
│   │   │       │   └── Type.kt              # Typography
│   │   │       └── screens/
│   │   │           ├── HomeScreen.kt        # Dashboard
│   │   │           ├── CreateScreen.kt      # AI creation tools
│   │   │           ├── ToolsScreen.kt       # Photo editing tools
│   │   │           ├── GalleryScreen.kt     # User gallery
│   │   │           └── PremiumScreen.kt     # Subscription plans
│   │   └── res/
│   │       └── values/
│   │           ├── strings.xml
│   │           └── themes.xml
│   ├── build.gradle.kts
│   └── proguard-rules.pro
├── gradle/
│   └── libs.versions.toml                   # Version catalog
├── build.gradle.kts
└── settings.gradle.kts
```

## Features

### 🏠 Home Screen
- Welcome header with gradient branding
- Hero banner with CTA
- Quick action grid (AI Art, Text→Image, Enhance, BG Remove)
- Stats row (50M+ users, 200+ styles, 4.9★ rating)
- Featured tools grid (Cartoon, Future Baby, Hair & Beard, AI Filters)
- Recent creations horizontal scroll
- Premium upgrade CTA
- Trending styles horizontal scroll

### 🎨 Create Screen
5 sub-feature tabs:
- **Art Styles** — 12 styles (4 free, 8 premium), intensity slider, upload & generate
- **Text→Image** — Prompt input, style presets, image size selection, prompt suggestions
- **Cartoon** — 4 cartoon styles (Disney, Anime, Comic, Pixar)
- **Future Baby** — Dual parent photo upload, baby age selection
- **Hair & Beard** — 6 hair styles + 5 beard styles

### 🛠️ Tools Screen
4 sub-feature tabs:
- **Enhance** — Quick enhance buttons, manual sliders (brightness, contrast, saturation, sharpness)
- **BG Remove** — 8 background replacement options, edge refinement modes
- **AI Filters** — 12 filters (6 free, 6 premium), category chips, 3-column grid
- **Object Edit** — Remove/Replace/Edit/Add modes, text description input

### 🖼️ Gallery Screen
- Grid/List view toggle
- Search bar
- Filter chips (All, Liked, Art Styles, etc.)
- Like/Share/Download/Delete actions
- Stats card (Created, Liked, Shared)
- Favorite styles with progress bars

### 👑 Premium Screen
- Hero section with social proof
- 3 pricing plans (Weekly $2.99, Monthly $9.99, Yearly $59.99)
- 7-day free trial CTA
- 6 feature comparison cards
- Free vs Premium table
- User testimonials

## Color Palette (Dark AI Aesthetic)

| Color | Hex | Usage |
|---|---|---|
| BgPrimary | `#0A0A0F` | Main background |
| BgCard | `#1A1A2E` | Card backgrounds |
| AccentPurple | `#7C3AED` | Primary accent |
| AccentPink | `#EC4899` | Secondary accent |
| AccentCyan | `#06B6D4` | Tools accent |
| AccentGreen | `#10B981` | Success/Enhance |
| AccentAmber | `#F59E0B` | Premium/Warning |

## How to Build

### Prerequisites
- Android Studio Hedgehog (2023.1.1) or newer
- JDK 11+
- Android SDK 35

### Steps
1. Open `android-app/` in Android Studio
2. Let Gradle sync complete
3. Run on emulator or physical device (API 26+)

```bash
# Build debug APK
./gradlew assembleDebug

# Install on connected device
./gradlew installDebug
```

## Architecture

- **Single Activity** with Jetpack Compose
- **Navigation Compose** for screen routing with argument passing
- **State hoisting** with `remember` and `mutableStateOf`
- **Coroutines** for simulated async operations
- **Material3** dark theme with custom color scheme
