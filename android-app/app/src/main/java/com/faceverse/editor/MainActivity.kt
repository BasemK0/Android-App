package com.faceverse.editor

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import androidx.navigation.navArgument
import com.faceverse.editor.ui.screens.*
import com.faceverse.editor.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            FaceVerseEditorTheme {
                FaceVerseApp()
            }
        }
    }
}

@Composable
fun FaceVerseApp() {
    val navController = rememberNavController()
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    Scaffold(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary),
        containerColor = BgPrimary,
        bottomBar = {
            FaceVerseBottomNav(
                currentRoute = currentRoute,
                navController = navController
            )
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier
                .fillMaxSize()
                .padding(innerPadding)
        ) {
            composable("home") {
                HomeScreen(
                    onNavigate = { tab, feature ->
                        when (tab) {
                            "create" -> navController.navigate("create?feature=${feature ?: ""}")
                            "tools" -> navController.navigate("tools?feature=${feature ?: ""}")
                            "gallery" -> navController.navigate("gallery")
                            "premium" -> navController.navigate("premium")
                        }
                    }
                )
            }
            composable(
                route = "create?feature={feature}",
                arguments = listOf(navArgument("feature") {
                    type = NavType.StringType
                    defaultValue = ""
                })
            ) { backStackEntry ->
                val feature = backStackEntry.arguments?.getString("feature") ?: ""
                CreateScreen(activeFeature = feature)
            }
            composable(
                route = "tools?feature={feature}",
                arguments = listOf(navArgument("feature") {
                    type = NavType.StringType
                    defaultValue = ""
                })
            ) { backStackEntry ->
                val feature = backStackEntry.arguments?.getString("feature") ?: ""
                ToolsScreen(activeFeature = feature)
            }
            composable("gallery") {
                GalleryScreen()
            }
            composable("premium") {
                PremiumScreen()
            }
        }
    }
}

data class BottomNavItem(
    val route: String,
    val label: String,
    val icon: ImageVector,
    val selectedIcon: ImageVector = icon
)

@Composable
fun FaceVerseBottomNav(
    currentRoute: String?,
    navController: NavController
) {
    val items = listOf(
        BottomNavItem("home", "Home", Icons.Filled.Home),
        BottomNavItem("create?feature=", "Create", Icons.Filled.AutoAwesome),
        BottomNavItem("tools?feature=", "Tools", Icons.Filled.Tune),
        BottomNavItem("gallery", "Gallery", Icons.Filled.PhotoLibrary),
        BottomNavItem("premium", "Premium", Icons.Filled.WorkspacePremium),
    )

    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(
                Brush.verticalGradient(
                    colors = listOf(Color.Transparent, BgSecondary)
                )
            )
    ) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 8.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.SpaceAround,
            verticalAlignment = Alignment.CenterVertically
        ) {
            items.forEach { item ->
                val isActive = when {
                    item.route == "home" -> currentRoute == "home"
                    item.route.startsWith("create") -> currentRoute?.startsWith("create") == true
                    item.route.startsWith("tools") -> currentRoute?.startsWith("tools") == true
                    else -> currentRoute == item.route
                }

                BottomNavButton(
                    item = item,
                    isActive = isActive,
                    onClick = {
                        val targetRoute = when {
                            item.route.startsWith("create") -> "create?feature="
                            item.route.startsWith("tools") -> "tools?feature="
                            else -> item.route
                        }
                        navController.navigate(targetRoute) {
                            popUpTo("home") { saveState = true }
                            launchSingleTop = true
                            restoreState = true
                        }
                    }
                )
            }
        }
    }
}

@Composable
fun BottomNavButton(
    item: BottomNavItem,
    isActive: Boolean,
    onClick: () -> Unit
) {
    val isPremium = item.route == "premium"

    Box(
        contentAlignment = Alignment.Center
    ) {
        // Premium dot indicator
        if (isPremium && !isActive) {
            Box(
                modifier = Modifier
                    .align(Alignment.TopEnd)
                    .offset(x = 4.dp, y = (-4).dp)
                    .size(8.dp)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(AccentAmber, AccentOrange)
                        ),
                        shape = RoundedCornerShape(50)
                    )
            )
        }

        TextButton(
            onClick = onClick,
            modifier = Modifier
                .clip(RoundedCornerShape(12.dp))
                .then(
                    if (isActive) Modifier.background(
                        Color(0x267C3AED),
                        RoundedCornerShape(12.dp)
                    ) else Modifier
                ),
            contentPadding = PaddingValues(horizontal = 12.dp, vertical = 8.dp)
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(2.dp)
            ) {
                Icon(
                    imageVector = item.icon,
                    contentDescription = item.label,
                    tint = if (isActive) PurpleLight else TextMuted,
                    modifier = Modifier.size(22.dp)
                )
                Text(
                    text = item.label,
                    fontSize = 10.sp,
                    fontWeight = if (isActive) FontWeight.SemiBold else FontWeight.Normal,
                    color = if (isActive) PurpleLight else TextMuted
                )
            }
        }
    }
}
