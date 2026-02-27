package com.faceverse.editor.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.faceverse.editor.ui.theme.*

data class QuickAction(
    val id: String,
    val icon: ImageVector,
    val label: String,
    val sublabel: String,
    val gradientStart: Color,
    val gradientEnd: Color,
    val tab: String,
    val feature: String
)

data class FeaturedTool(
    val id: String,
    val emoji: String,
    val title: String,
    val description: String,
    val badge: String,
    val badgeColor: Color,
    val tab: String,
    val feature: String
)

@Composable
fun HomeScreen(onNavigate: (String, String?) -> Unit) {
    val scrollState = rememberScrollState()

    val quickActions = listOf(
        QuickAction("art-styles", Icons.Filled.Palette, "AI Art", "Selfie to Art",
            Color(0xFF7C3AED), Color(0xFFEC4899), "create", "art-styles"),
        QuickAction("text-to-image", Icons.Filled.AutoAwesome, "Text→Image", "AI Generate",
            Color(0xFF06B6D4), Color(0xFF7C3AED), "create", "text-to-image"),
        QuickAction("enhance", Icons.Filled.Bolt, "Enhance", "Portrait AI",
            Color(0xFF10B981), Color(0xFF06B6D4), "tools", "enhance"),
        QuickAction("bg-remove", Icons.Filled.ContentCut, "BG Remove", "Clean Cut",
            Color(0xFFF97316), Color(0xFFEC4899), "tools", "bg-remove"),
    )

    val featuredTools = listOf(
        FeaturedTool("cartoon", "🎨", "Cartoon Style", "Turn photos into animated cartoon art",
            "HOT", AccentPink, "create", "cartoon"),
        FeaturedTool("future-baby", "👶", "Future Baby", "Generate your future baby portrait",
            "NEW", AccentPurple, "create", "future-baby"),
        FeaturedTool("hair-style", "💇", "Hair & Beard", "Try different hairstyles & beard styles",
            "FREE", AccentGreen, "create", "hair-style"),
        FeaturedTool("filters", "✨", "AI Filters", "100+ AI-powered photo filters",
            "PRO", AccentAmber, "tools", "filters"),
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary)
            .verticalScroll(scrollState)
            .padding(bottom = 16.dp)
    ) {
        // Header
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text(
                    text = "Good morning 👋",
                    fontSize = 13.sp,
                    color = TextSecondary
                )
                Row {
                    Text(
                        text = "FaceVerse",
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        style = LocalTextStyle.current.copy(
                            brush = Brush.linearGradient(
                                colors = listOf(AccentPurple, AccentPink)
                            )
                        )
                    )
                    Text(
                        text = " Editor",
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        color = TextPrimary
                    )
                }
            }
            Box {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(
                            Brush.linearGradient(
                                colors = listOf(AccentPurple, AccentPink)
                            ),
                            CircleShape
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Text("AI", color = Color.White, fontWeight = FontWeight.Bold, fontSize = 13.sp)
                }
                Box(
                    modifier = Modifier
                        .size(10.dp)
                        .background(AccentPink, CircleShape)
                        .align(Alignment.TopEnd)
                )
            }
        }

        // Hero Banner
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(Color(0xFF1A0A2E), Color(0xFF16213E), Color(0xFF0F3460))
                    )
                )
                .border(1.dp, Color(0x4D7C3AED), RoundedCornerShape(16.dp))
                .padding(20.dp)
        ) {
            Column(modifier = Modifier.fillMaxWidth(0.7f)) {
                Box(
                    modifier = Modifier
                        .background(Color(0x4D7C3AED), RoundedCornerShape(50))
                        .padding(horizontal = 8.dp, vertical = 3.dp)
                ) {
                    Text("✨ AI POWERED", fontSize = 10.sp, fontWeight = FontWeight.Bold, color = PurpleLight)
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "Transform Your Photos",
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Bold,
                    color = Color.White
                )
                Text(
                    "Create stunning AI art from your selfies in seconds",
                    fontSize = 12.sp,
                    color = Color(0xFF94A3B8),
                    modifier = Modifier.padding(vertical = 6.dp)
                )
                Button(
                    onClick = { onNavigate("create", "art-styles") },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Transparent
                    ),
                    modifier = Modifier
                        .background(
                            Brush.linearGradient(
                                colors = listOf(AccentPurple, AccentPink)
                            ),
                            RoundedCornerShape(50)
                        ),
                    contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp)
                ) {
                    Icon(Icons.Filled.AutoAwesome, contentDescription = null, modifier = Modifier.size(14.dp))
                    Spacer(modifier = Modifier.width(6.dp))
                    Text("Try Now — It's Free", fontSize = 13.sp, fontWeight = FontWeight.SemiBold)
                }
            }
            Text(
                "🎨",
                fontSize = 48.sp,
                modifier = Modifier.align(Alignment.CenterEnd)
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Quick Actions
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Quick Actions", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            TextButton(onClick = { onNavigate("create", null) }) {
                Text("See all", fontSize = 12.sp, color = AccentPurple)
                Icon(Icons.Filled.ChevronRight, contentDescription = null, tint = AccentPurple, modifier = Modifier.size(14.dp))
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            quickActions.forEach { action ->
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    modifier = Modifier
                        .clickable { onNavigate(action.tab, action.feature) }
                        .padding(4.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(56.dp)
                            .background(
                                Brush.linearGradient(
                                    colors = listOf(action.gradientStart, action.gradientEnd)
                                ),
                                RoundedCornerShape(16.dp)
                            ),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(action.icon, contentDescription = action.label, tint = Color.White, modifier = Modifier.size(24.dp))
                    }
                    Spacer(modifier = Modifier.height(6.dp))
                    Text(action.label, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                    Text(action.sublabel, fontSize = 9.sp, color = TextMuted)
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Stats Row
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(BgCard)
                .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceAround
            ) {
                listOf(
                    Triple("50M+", "Users", "👥"),
                    Triple("200+", "AI Styles", "🎨"),
                    Triple("4.9★", "Rating", "⭐")
                ).forEach { (value, label, icon) ->
                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(icon, fontSize = 18.sp)
                        Text(
                            value,
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            style = LocalTextStyle.current.copy(
                                brush = Brush.linearGradient(
                                    colors = listOf(AccentPurple, AccentPink)
                                )
                            )
                        )
                        Text(label, fontSize = 11.sp, color = TextMuted)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Featured Tools
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Featured Tools", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.TrendingUp, contentDescription = null, tint = AccentPurple, modifier = Modifier.size(14.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("Trending", fontSize = 12.sp, color = AccentPurple)
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // 2x2 grid of featured tools
        Column(
            modifier = Modifier.padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            featuredTools.chunked(2).forEach { rowItems ->
                Row(
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    rowItems.forEach { tool ->
                        FeaturedToolCard(
                            tool = tool,
                            modifier = Modifier.weight(1f),
                            onClick = { onNavigate(tool.tab, tool.feature) }
                        )
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Recent Creations
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Recent Creations", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            TextButton(onClick = { onNavigate("gallery", null) }) {
                Text("View all", fontSize = 12.sp, color = AccentPurple)
                Icon(Icons.Filled.ChevronRight, contentDescription = null, tint = AccentPurple, modifier = Modifier.size(14.dp))
            }
        }

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            listOf(
                Triple("🌸", "Anime", Color(0xFF7C3AED)),
                Triple("🎨", "Oil Paint", Color(0xFFEC4899)),
                Triple("🎭", "Cartoon", Color(0xFF06B6D4)),
                Triple("✏️", "Sketch", Color(0xFF10B981))
            ).forEach { (emoji, style, color) ->
                Column(
                    modifier = Modifier
                        .size(80.dp)
                        .background(
                            color.copy(alpha = 0.13f),
                            RoundedCornerShape(16.dp)
                        )
                        .border(1.dp, color.copy(alpha = 0.27f), RoundedCornerShape(16.dp)),
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(emoji, fontSize = 24.sp)
                    Text(style, fontSize = 9.sp, fontWeight = FontWeight.Medium, color = color)
                }
            }
            // Add new button
            Column(
                modifier = Modifier
                    .size(80.dp)
                    .border(2.dp, BorderColor, RoundedCornerShape(16.dp))
                    .clickable { onNavigate("create", null) },
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Icon(Icons.Filled.CameraAlt, contentDescription = "New", tint = TextMuted, modifier = Modifier.size(20.dp))
                Text("New", fontSize = 9.sp, color = TextMuted)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Premium CTA
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .clip(RoundedCornerShape(16.dp))
                .background(
                    Brush.linearGradient(
                        colors = listOf(Color(0x26F59E0B), Color(0x26F97316))
                    )
                )
                .border(1.dp, Color(0x4DF59E0B), RoundedCornerShape(16.dp))
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(
                        Brush.linearGradient(
                            colors = listOf(AccentAmber, AccentOrange)
                        ),
                        RoundedCornerShape(12.dp)
                    ),
                contentAlignment = Alignment.Center
            ) {
                Icon(Icons.Filled.WorkspacePremium, contentDescription = null, tint = Color.White, modifier = Modifier.size(24.dp))
            }
            Column(modifier = Modifier.weight(1f)) {
                Text("Upgrade to Premium", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = AccentAmber)
                Text("Unlock 200+ styles & unlimited exports", fontSize = 11.sp, color = TextSecondary)
            }
            Button(
                onClick = { onNavigate("premium", null) },
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                modifier = Modifier.background(
                    Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                    RoundedCornerShape(8.dp)
                ),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Text("Try Free", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Trending Styles
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text("Trending Styles", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Row(verticalAlignment = Alignment.CenterVertically) {
                Icon(Icons.Filled.Star, contentDescription = null, tint = AccentAmber, modifier = Modifier.size(12.dp))
                Spacer(modifier = Modifier.width(4.dp))
                Text("This week", fontSize = 12.sp, color = TextSecondary)
            }
        }

        Spacer(modifier = Modifier.height(8.dp))

        Row(
            modifier = Modifier
                .fillMaxWidth()
                .horizontalScroll(rememberScrollState())
                .padding(horizontal = 20.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf(
                Triple("🌸", "Anime", "2.1M"),
                Triple("🤖", "Cyberpunk", "1.8M"),
                Triple("💧", "Watercolor", "1.5M"),
                Triple("🎮", "3D Render", "1.2M"),
                Triple("📷", "Vintage", "980K")
            ).forEach { (emoji, name, count) ->
                Row(
                    modifier = Modifier
                        .clip(RoundedCornerShape(12.dp))
                        .background(BgCard)
                        .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                        .clickable { onNavigate("create", "art-styles") }
                        .padding(horizontal = 12.dp, vertical = 8.dp),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Text(emoji, fontSize = 16.sp)
                    Column {
                        Text(name, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                        Text("$count uses", fontSize = 9.sp, color = TextMuted)
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(8.dp))
    }
}

@Composable
fun FeaturedToolCard(
    tool: FeaturedTool,
    modifier: Modifier = Modifier,
    onClick: () -> Unit
) {
    Box(
        modifier = modifier
            .clip(RoundedCornerShape(16.dp))
            .background(BgCard)
            .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
            .clickable(onClick = onClick)
            .padding(16.dp)
    ) {
        Column {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Text(tool.emoji, fontSize = 24.sp)
                Box(
                    modifier = Modifier
                        .background(tool.badgeColor.copy(alpha = 0.13f), RoundedCornerShape(50))
                        .border(1.dp, tool.badgeColor.copy(alpha = 0.27f), RoundedCornerShape(50))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(tool.badge, fontSize = 9.sp, fontWeight = FontWeight.Bold, color = tool.badgeColor)
                }
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(tool.title, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
            Text(tool.description, fontSize = 11.sp, color = TextSecondary, lineHeight = 15.sp)
        }
    }
}
