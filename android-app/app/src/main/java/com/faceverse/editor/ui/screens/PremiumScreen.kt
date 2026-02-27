package com.faceverse.editor.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
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
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.faceverse.editor.ui.theme.*

data class PricingPlan(
    val id: String,
    val name: String,
    val price: String,
    val period: String,
    val originalPrice: String?,
    val popular: Boolean,
    val color: Color,
    val savings: String?
)

data class PremiumFeature(
    val icon: ImageVector,
    val title: String,
    val desc: String,
    val free: String,
    val premium: String,
    val color: Color
)

@Composable
fun PremiumScreen() {
    val plans = listOf(
        PricingPlan("weekly", "Weekly", "\$2.99", "/week", null, false, AccentPurple, null),
        PricingPlan("monthly", "Monthly", "\$9.99", "/month", "\$14.99", true, AccentPink, "Save 33%"),
        PricingPlan("yearly", "Yearly", "\$59.99", "/year", "\$119.88", false, AccentAmber, "Save 50%"),
    )

    val premiumFeatures = listOf(
        PremiumFeature(Icons.Filled.AutoAwesome, "200+ AI Art Styles",
            "Access all premium art styles including Cyberpunk, 3D Render, Neon Glow",
            "12 styles", "200+ styles", AccentPurple),
        PremiumFeature(Icons.Filled.Bolt, "Unlimited Generations",
            "Generate as many images as you want without daily limits",
            "5/day", "Unlimited", AccentGreen),
        PremiumFeature(Icons.Filled.Star, "HD Export Quality",
            "Export images in 4K resolution without watermarks",
            "720p + watermark", "4K, no watermark", AccentAmber),
        PremiumFeature(Icons.Filled.WorkspacePremium, "Priority Processing",
            "Your images are processed first with faster AI models",
            "Standard queue", "Priority queue", AccentPink),
        PremiumFeature(Icons.Filled.Shield, "Commercial License",
            "Use your AI creations for commercial purposes",
            "Personal only", "Commercial use", AccentCyan),
        PremiumFeature(Icons.Filled.CloudUpload, "Cloud Storage",
            "Store all your creations in the cloud forever",
            "50 photos", "Unlimited", AccentOrange),
    )

    val freeFeatures = listOf(
        "12 basic AI art styles",
        "5 generations per day",
        "720p export with watermark",
        "Basic portrait enhancement",
        "Background removal (3/day)",
        "50 photo cloud storage",
    )

    val premiumOnlyFeatures = listOf(
        "200+ premium AI art styles",
        "Unlimited daily generations",
        "4K export, no watermark",
        "Advanced portrait AI tools",
        "Unlimited background removal",
        "Unlimited cloud storage",
        "Priority AI processing",
        "Commercial license",
        "Exclusive new styles first",
        "24/7 premium support",
    )

    var selectedPlan by remember { mutableStateOf("monthly") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BgPrimary)
            .verticalScroll(rememberScrollState())
    ) {
        // Hero Section
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .background(
                    Brush.verticalGradient(
                        colors = listOf(Color(0xFF1A0A2E), BgPrimary)
                    )
                )
                .padding(horizontal = 20.dp, vertical = 32.dp)
        ) {
            // Background glow orbs
            Box(
                modifier = Modifier
                    .size(200.dp)
                    .background(
                        Brush.radialGradient(
                            colors = listOf(AccentPurple.copy(alpha = 0.2f), Color.Transparent)
                        ),
                        CircleShape
                    )
                    .align(Alignment.TopCenter)
                    .offset(y = (-50).dp)
            )

            Column(
                modifier = Modifier.fillMaxWidth(),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Box(
                    modifier = Modifier
                        .size(64.dp)
                        .background(
                            Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                            RoundedCornerShape(16.dp)
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(Icons.Filled.WorkspacePremium, contentDescription = null, tint = Color.White, modifier = Modifier.size(32.dp))
                }
                Spacer(modifier = Modifier.height(16.dp))
                Row {
                    Text("FaceVerse ", fontSize = 22.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    Text(
                        "Premium",
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        style = LocalTextStyle.current.copy(
                            brush = Brush.linearGradient(colors = listOf(AccentPurple, AccentPink))
                        )
                    )
                }
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    "Unlock the full power of AI photo editing",
                    fontSize = 13.sp,
                    color = Color(0xFF94A3B8)
                )

                Spacer(modifier = Modifier.height(16.dp))

                // Social proof
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Row {
                        listOf("🧑", "👩", "👨", "🧑").forEachIndexed { index, emoji ->
                            Box(
                                modifier = Modifier
                                    .offset(x = (-index * 8).dp)
                                    .size(28.dp)
                                    .background(BgCard, CircleShape)
                                    .border(2.dp, BgPrimary, CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(emoji, fontSize = 14.sp)
                            }
                        }
                    }
                    Row {
                        Text("2M+", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        Text(" premium users", fontSize = 12.sp, color = Color(0xFF94A3B8))
                    }
                }
            }
        }

        // Plan Selection
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp),
            verticalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            plans.forEach { plan ->
                val isSelected = selectedPlan == plan.id
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(16.dp))
                        .background(
                            if (isSelected) Brush.linearGradient(
                                colors = listOf(plan.color.copy(alpha = 0.13f), plan.color.copy(alpha = 0.07f))
                            ) else Brush.linearGradient(colors = listOf(BgCard, BgCard))
                        )
                        .border(
                            if (isSelected) 2.dp else 1.dp,
                            if (isSelected) plan.color else BorderColor,
                            RoundedCornerShape(16.dp)
                        )
                        .clickable { selectedPlan = plan.id }
                        .padding(16.dp)
                ) {
                    if (plan.popular) {
                        Box(
                            modifier = Modifier
                                .align(Alignment.TopCenter)
                                .offset(y = (-24).dp)
                                .background(
                                    Brush.linearGradient(colors = listOf(AccentPink, AccentPurple)),
                                    RoundedCornerShape(50)
                                )
                                .padding(horizontal = 12.dp, vertical = 4.dp)
                        ) {
                            Text("⭐ Most Popular", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                        }
                    }

                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(20.dp)
                                    .border(2.dp, if (isSelected) plan.color else BorderColor, CircleShape)
                                    .background(if (isSelected) plan.color else Color.Transparent, CircleShape),
                                contentAlignment = Alignment.Center
                            ) {
                                if (isSelected) {
                                    Icon(Icons.Filled.Check, contentDescription = null, tint = Color.White, modifier = Modifier.size(10.dp))
                                }
                            }
                            Column {
                                Text(plan.name, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
                                if (plan.savings != null) {
                                    Box(
                                        modifier = Modifier
                                            .background(plan.color.copy(alpha = 0.13f), RoundedCornerShape(50))
                                            .padding(horizontal = 8.dp, vertical = 2.dp)
                                    ) {
                                        Text(plan.savings, fontSize = 10.sp, fontWeight = FontWeight.Bold, color = plan.color)
                                    }
                                }
                            }
                        }
                        Column(horizontalAlignment = Alignment.End) {
                            Row(verticalAlignment = Alignment.Bottom) {
                                Text(plan.price, fontSize = 20.sp, fontWeight = FontWeight.Bold, color = plan.color)
                                Text(plan.period, fontSize = 11.sp, color = TextMuted)
                            }
                            if (plan.originalPrice != null) {
                                Text(
                                    plan.originalPrice,
                                    fontSize = 11.sp,
                                    color = TextMuted,
                                    textDecoration = TextDecoration.LineThrough
                                )
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // CTA Button
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .background(
                        Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                        RoundedCornerShape(12.dp)
                    ),
                contentPadding = PaddingValues(0.dp)
            ) {
                Icon(Icons.Filled.WorkspacePremium, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Start Free Trial — 7 Days Free", fontSize = 15.sp, fontWeight = FontWeight.Bold)
            }
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                "Cancel anytime • No commitment",
                fontSize = 11.sp,
                color = TextMuted,
                modifier = Modifier.align(Alignment.CenterHorizontally)
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // What's Included
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
        ) {
            Text("What's Included", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Spacer(modifier = Modifier.height(12.dp))

            premiumFeatures.forEach { feat ->
                Row(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(BgCard)
                        .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                        .padding(12.dp),
                    verticalAlignment = Alignment.Top,
                    horizontalArrangement = Arrangement.spacedBy(12.dp)
                ) {
                    Box(
                        modifier = Modifier
                            .size(36.dp)
                            .background(feat.color.copy(alpha = 0.13f), RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(feat.icon, contentDescription = null, tint = feat.color, modifier = Modifier.size(18.dp))
                    }
                    Column(modifier = Modifier.weight(1f)) {
                        Text(feat.title, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                        Text(feat.desc, fontSize = 11.sp, color = TextSecondary, modifier = Modifier.padding(vertical = 4.dp))
                        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(Icons.Filled.Close, contentDescription = null, tint = Error, modifier = Modifier.size(10.dp))
                                Text("Free: ${feat.free}", fontSize = 10.sp, color = TextMuted)
                            }
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(4.dp)
                            ) {
                                Icon(Icons.Filled.Check, contentDescription = null, tint = AccentGreen, modifier = Modifier.size(10.dp))
                                Text("Pro: ${feat.premium}", fontSize = 10.sp, color = AccentGreen)
                            }
                        }
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Free vs Premium Table
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
        ) {
            Text("Free vs Premium", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Spacer(modifier = Modifier.height(12.dp))

            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .clip(RoundedCornerShape(16.dp))
                    .border(1.dp, BorderColor, RoundedCornerShape(16.dp))
            ) {
                Column {
                    // Header
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(BgSecondary)
                    ) {
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .padding(12.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("Free", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = TextSecondary)
                        }
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .background(AccentAmber.copy(alpha = 0.1f))
                                .padding(12.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Text("👑 Premium", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = AccentAmber)
                        }
                    }

                    // Features
                    Row(modifier = Modifier.fillMaxWidth()) {
                        Column(
                            modifier = Modifier
                                .weight(1f)
                                .padding(12.dp)
                        ) {
                            freeFeatures.forEach { feat ->
                                Row(
                                    verticalAlignment = Alignment.Top,
                                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                                    modifier = Modifier.padding(bottom = 8.dp)
                                ) {
                                    Icon(Icons.Filled.Check, contentDescription = null, tint = TextMuted, modifier = Modifier.size(12.dp).padding(top = 2.dp))
                                    Text(feat, fontSize = 11.sp, color = TextSecondary, lineHeight = 15.sp)
                                }
                            }
                        }
                        Column(
                            modifier = Modifier
                                .weight(1f)
                                .background(AccentAmber.copy(alpha = 0.05f))
                                .padding(12.dp)
                        ) {
                            premiumOnlyFeatures.forEach { feat ->
                                Row(
                                    verticalAlignment = Alignment.Top,
                                    horizontalArrangement = Arrangement.spacedBy(6.dp),
                                    modifier = Modifier.padding(bottom = 8.dp)
                                ) {
                                    Icon(Icons.Filled.Check, contentDescription = null, tint = AccentAmber, modifier = Modifier.size(12.dp).padding(top = 2.dp))
                                    Text(feat, fontSize = 11.sp, color = TextPrimary, lineHeight = 15.sp)
                                }
                            }
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Testimonials
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
        ) {
            Text("What Users Say", fontSize = 15.sp, fontWeight = FontWeight.Bold, color = TextPrimary)
            Spacer(modifier = Modifier.height(12.dp))

            listOf(
                Triple("👩‍🦰", "Sarah M.", "The AI art styles are incredible! I use it every day to create unique content for my social media."),
                Triple("👨‍💼", "James K.", "Background removal is flawless. Saves me hours of Photoshop work. Worth every penny!"),
                Triple("👩‍🎨", "Priya S.", "The future baby feature is so fun! Generated portraits for my whole family. Amazing quality."),
            ).forEach { (avatar, name, text) ->
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .clip(RoundedCornerShape(12.dp))
                        .background(BgCard)
                        .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                        .padding(16.dp)
                ) {
                    Column {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.spacedBy(12.dp)
                        ) {
                            Text(avatar, fontSize = 24.sp)
                            Column {
                                Text(name, fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
                                Row {
                                    repeat(5) {
                                        Icon(Icons.Filled.Star, contentDescription = null, tint = AccentAmber, modifier = Modifier.size(10.dp))
                                    }
                                }
                            }
                        }
                        Spacer(modifier = Modifier.height(8.dp))
                        Text("\"$text\"", fontSize = 11.sp, color = TextSecondary, lineHeight = 16.sp)
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
            }
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Final CTA
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 20.dp)
                .padding(bottom = 16.dp)
        ) {
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                modifier = Modifier
                    .fillMaxWidth()
                    .height(56.dp)
                    .background(
                        Brush.linearGradient(colors = listOf(AccentAmber, AccentOrange)),
                        RoundedCornerShape(12.dp)
                    ),
                contentPadding = PaddingValues(0.dp)
            ) {
                Icon(Icons.Filled.WorkspacePremium, contentDescription = null, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.width(8.dp))
                Text("Upgrade to Premium", fontSize = 15.sp, fontWeight = FontWeight.Bold)
            }

            Spacer(modifier = Modifier.height(12.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceAround
            ) {
                listOf(
                    Pair(Icons.Filled.Shield, "Secure Payment"),
                    Pair(Icons.Filled.Bolt, "Instant Access"),
                    Pair(Icons.Filled.Close, "Cancel Anytime"),
                ).forEach { (icon, text) ->
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(icon, contentDescription = null, tint = TextMuted, modifier = Modifier.size(12.dp))
                        Text(text, fontSize = 10.sp, color = TextMuted)
                    }
                }
            }
        }
    }
}
