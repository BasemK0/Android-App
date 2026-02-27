package com.faceverse.editor.navigation

sealed class Screen(val route: String) {
    object Home : Screen("home")
    object Create : Screen("create?feature={feature}") {
        fun createRoute(feature: String = "") = "create?feature=$feature"
    }
    object Tools : Screen("tools?feature={feature}") {
        fun createRoute(feature: String = "") = "tools?feature=$feature"
    }
    object Gallery : Screen("gallery")
    object Premium : Screen("premium")
}

val bottomNavItems = listOf(
    BottomNavItem(
        screen = Screen.Home,
        label = "Home",
        route = "home"
    ),
    BottomNavItem(
        screen = Screen.Create,
        label = "Create",
        route = "create?feature="
    ),
    BottomNavItem(
        screen = Screen.Tools,
        label = "Tools",
        route = "tools?feature="
    ),
    BottomNavItem(
        screen = Screen.Gallery,
        label = "Gallery",
        route = "gallery"
    ),
    BottomNavItem(
        screen = Screen.Premium,
        label = "Premium",
        route = "premium"
    )
)

data class BottomNavItem(
    val screen: Screen,
    val label: String,
    val route: String
)
