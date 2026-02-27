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
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.faceverse.editor.ui.theme.*

data class GalleryItem(
    val id: Int,
    val style: String,
    val emoji: String,
    val color: Color,
    val date: String,
    val liked: Boolean,
    val premium: Boolean
)

@Composable
fun GalleryScreen() {
    val galleryItems = remember {
        listOf(
            GalleryItem(1, "Anime", "🌸", Color(0xFF7C3AED), "Today", true, false),
            GalleryItem(2, "Cyberpunk", "🤖", Color(0xFF06B6D4), "Today", false, true),
            GalleryItem(3, "Oil Paint", "🎨", Color(0xFFEC4899), "Yesterday", true, false),
            GalleryItem(4, "Future Baby", "👶", Color(0xFFF59E0B), "Yesterday", false, true),
            GalleryItem(5, "Cartoon", "🎭", Color(0xFF10B981), "2 days ago", true, false),
            GalleryItem(6, "Watercolor", "💧", Color(0xFF7C3AED), "3 days ago", false, false),
            GalleryItem(7, "3D Render", "🎮", Color(0xFFF97316), "3 days ago", true, true),
            GalleryItem(8, "Sketch", "✏️", Color(0xFF94A3B8), "1 week ago", false, false),
            GalleryItem(9, "Neon Glow", "💜", Color(0xFFA78BFA), "1 week ago", true, true),
        )
    }

    var viewMode by remember { mutableStateOf("grid") }
    var activeFilter by remember { mutableStateOf("All") }
    var searchQuery by remember { mutableStateOf("") }
    val likedItems = remember { mutableStateSetOf<Int>().apply {
        galleryItems.filter { it.liked }.forEach { add(it.id) }
    }}

    val filters = listOf("All", "Liked", "Art Styles", "Text-to-Image", "Enhanced", "Cartoon")

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary)
    ) {
        // Header
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp, vertical = 16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Column {
                    Text("My Gallery", fontSize = 20.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                    Text("${galleryItems.size} creations", fontSize = 12.sp, color = TextSecondary)
                }
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(BgCard)
                            .border(1.dp, BorderColor, RoundedCornerShape(10.dp))
                            .clickable { viewMode = if (viewMode == "grid") "list" else "grid" },
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            if (viewMode == "grid") Icons.Filled.ViewList else Icons.Filled.GridView,
                            contentDescription = "Toggle view",
                            tint = TextSecondary,
                            modifier = Modifier.size(16.dp)
                        )
                    }
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .clip(RoundedCornerShape(10.dp))
                            .background(BgCard)
                            .border(1.dp, BorderColor, RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(Icons.Filled.FilterList, contentDescription = "Filter", tint = TextSecondary, modifier = Modifier.size(16.dp))
                    }
                }
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Search
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(12.dp))
                    .background(BgCard)
                    .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                    .padding(horizontal = 12.dp, vertical = 10.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Icon(Icons.Filled.Search, contentDescription = null, tint = TextMuted, modifier = Modifier.size(16.dp))
                Text("Search creations...", fontSize = 13.sp, color = TextMuted)
            }

            Spacer(modifier = Modifier.height(12.dp))

            // Filter chips
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                filters.forEach { filter ->
                    val isActive = activeFilter == filter
                    Box(
                        modifier = Modifier
                            .clip(RoundedCornerShape(50))
                            .background(
                                if (isActive) Brush.linearGradient(colors = listOf(AccentPurple, AccentPink))
                                else Brush.linearGradient(colors = listOf(BgCard, BgCard))
                            )
                            .then(
                                if (!isActive) Modifier.border(1.dp, BorderColor, RoundedCornerShape(50))
                                else Modifier
                            )
                            .clickable { activeFilter = filter }
                            .padding(horizontal = 12.dp, vertical = 6.dp)
                    ) {
                        Text(filter, fontSize = 11.sp, fontWeight = FontWeight.Medium, color = if (isActive) Color.White else TextSecondary)
                    }
                }
            }
        }

        // Gallery Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
                .padding(bottom = 16.dp)
        ) {
            if (viewMode == "grid") {
                // 3-column grid
                val rows = galleryItems.chunked(3)
                rows.forEach { row ->
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        row.forEach { item ->
                            val isLiked = likedItems.contains(item.id)
                            Box(
                                modifier = Modifier
                                    .weight(1f)
                                    .aspectRatio(1f)
                                    .clip(RoundedCornerShape(12.dp))
                            ) {
                                // Image placeholder
                                Box(
                                    modifier = Modifier
                                        .fillMaxSize()
                                        .background(
                                            Brush.linearGradient(
                                                colors = listOf(
                                                    item.color.copy(alpha = 0.2f),
                                                    item.color.copy(alpha = 0.07f)
                                                )
                                            )
                                        )
                                        .border(1.dp, item.color.copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Text(item.emoji, fontSize = 32.sp)
                                }

                                // Like button
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.TopEnd)
                                        .padding(6.dp)
                                        .size(24.dp)
                                        .background(Color(0x80000000), CircleShape)
                                        .clickable {
                                            if (isLiked) likedItems.remove(item.id)
                                            else likedItems.add(item.id)
                                        },
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        if (isLiked) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder,
                                        contentDescription = "Like",
                                        tint = if (isLiked) AccentPink else Color.White,
                                        modifier = Modifier.size(12.dp)
                                    )
                                }

                                // PRO badge
                                if (item.premium) {
                                    Box(
                                        modifier = Modifier
                                            .align(Alignment.TopStart)
                                            .padding(6.dp)
                                            .background(
                                                Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                                                RoundedCornerShape(4.dp)
                                            )
                                            .padding(horizontal = 4.dp, vertical = 1.dp)
                                    ) {
                                        Text("PRO", fontSize = 7.sp, fontWeight = FontWeight.Bold, color = Color.White)
                                    }
                                }
                            }
                        }
                        repeat(3 - row.size) {
                            Spacer(modifier = Modifier.weight(1f))
                        }
                    }
                    Spacer(modifier = Modifier.height(4.dp))
                }
            } else {
                // List view
                galleryItems.forEach { item ->
                    val isLiked = likedItems.contains(item.id)
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clip(RoundedCornerShape(12.dp))
                            .background(BgCard)
                            .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                            .padding(12.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Box(
                            modifier = Modifier
                                .size(56.dp)
                                .background(item.color.copy(alpha = 0.13f), RoundedCornerShape(12.dp))
                                .border(1.dp, item.color.copy(alpha = 0.2f), RoundedCornerShape(12.dp)),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(item.emoji, fontSize = 24.sp)
                        }
                        Column(modifier = Modifier.weight(1f)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(6.dp)
                            ) {
                                Text(item.style, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                                if (item.premium) {
                                    Box(
                                        modifier = Modifier
                                            .background(
                                                Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                                                RoundedCornerShape(4.dp)
                                            )
                                            .padding(horizontal = 4.dp, vertical = 1.dp)
                                    ) {
                                        Text("PRO", fontSize = 7.sp, fontWeight = FontWeight.Bold, color = Color.White)
                                    }
                                }
                            }
                            Text(item.date, fontSize = 11.sp, color = TextMuted)
                        }
                        Row(
                            horizontalArrangement = Arrangement.spacedBy(12.dp),
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Icon(
                                if (isLiked) Icons.Filled.Favorite else Icons.Filled.FavoriteBorder,
                                contentDescription = "Like",
                                tint = if (isLiked) AccentPink else TextMuted,
                                modifier = Modifier
                                    .size(16.dp)
                                    .clickable {
                                        if (isLiked) likedItems.remove(item.id)
                                        else likedItems.add(item.id)
                                    }
                            )
                            Icon(Icons.Filled.Share, contentDescription = "Share", tint = TextMuted, modifier = Modifier.size(16.dp))
                            Icon(Icons.Filled.Download, contentDescription = "Download", tint = TextMuted, modifier = Modifier.size(16.dp))
                            Icon(Icons.Filled.Delete, contentDescription = "Delete", tint = TextMuted, modifier = Modifier.size(16.dp))
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Stats
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .background(BgCard)
                    .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
                    .padding(16.dp)
            ) {
                Column {
                    Text("Your Stats", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                    Spacer(modifier = Modifier.height(12.dp))
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceAround
                    ) {
                        listOf(
                            Triple("🎨", "9", "Created"),
                            Triple("❤️", "${likedItems.size}", "Liked"),
                            Triple("📤", "3", "Shared")
                        ).forEach { (icon, value, label) ->
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text(icon, fontSize = 20.sp)
                                Text(
                                    value,
                                    fontSize = 18.sp,
                                    fontWeight = FontWeight.Bold,
                                    style = LocalTextStyle.current.copy(
                                        brush = Brush.linearGradient(colors = listOf(AccentPurple, AccentPink))
                                    )
                                )
                                Text(label, fontSize = 11.sp, color = TextMuted)
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Favorite Styles
            Text("Your Favorite Styles", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
            Spacer(modifier = Modifier.height(12.dp))

            listOf(
                Triple("Anime", 3, AccentPurple),
                Triple("Oil Paint", 2, AccentPink),
                Triple("Cartoon", 2, AccentGreen)
            ).forEachIndexed { index, (style, count, color) ->
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(24.dp)
                            .background(color, CircleShape),
                        contentAlignment = Alignment.Center
                    ) {
                        Text("${index + 1}", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Text(style, fontSize = 11.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                            Text("$count times", fontSize = 11.sp, color = TextMuted)
                        }
                        Spacer(modifier = Modifier.height(4.dp))
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(4.dp)
                                .clip(RoundedCornerShape(50))
                                .background(BorderColor)
                        ) {
                            Box(
                                modifier = Modifier
                                    .fillMaxWidth((count / 3f))
                                    .fillMaxHeight()
                                    .background(color, RoundedCornerShape(50))
                            )
                        }
                    }
                    Icon(Icons.Filled.Star, contentDescription = null, tint = AccentAmber, modifier = Modifier.size(12.dp))
                }
                Spacer(modifier = Modifier.height(12.dp))
            }
        }
    }
}
