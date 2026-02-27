package com.faceverse.editor.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.horizontalScroll
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.faceverse.editor.ui.theme.*
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

data class FilterItem(val id: String, val name: String, val emoji: String, val premium: Boolean)
data class ToolSubFeature(val id: String, val label: String, val icon: ImageVector)

@Composable
fun ToolsScreen(activeFeature: String = "") {
    val filters = listOf(
        FilterItem("vivid", "Vivid", "🌈", false),
        FilterItem("cinematic", "Cinematic", "🎬", false),
        FilterItem("golden-hour", "Golden Hour", "🌅", false),
        FilterItem("moody", "Moody", "🌑", false),
        FilterItem("neon-dream", "Neon Dream", "💜", true),
        FilterItem("vintage-film", "Vintage Film", "📽️", true),
        FilterItem("arctic", "Arctic", "❄️", false),
        FilterItem("sunset", "Sunset", "🌇", false),
        FilterItem("forest", "Forest", "🌿", true),
        FilterItem("ocean", "Ocean", "🌊", true),
        FilterItem("fire", "Fire", "🔥", true),
        FilterItem("galaxy", "Galaxy", "🌌", true),
    )

    val subFeatures = listOf(
        ToolSubFeature("enhance", "Enhance", Icons.Filled.Bolt),
        ToolSubFeature("bg-remove", "BG Remove", Icons.Filled.ContentCut),
        ToolSubFeature("filters", "AI Filters", Icons.Filled.AutoAwesome),
        ToolSubFeature("object-edit", "Object Edit", Icons.Filled.Edit),
    )

    var currentFeature by remember {
        mutableStateOf(if (activeFeature.isNotEmpty()) activeFeature else "enhance")
    }
    var imageUploaded by remember { mutableStateOf(false) }
    var isProcessing by remember { mutableStateOf(false) }
    var isProcessed by remember { mutableStateOf(false) }
    var selectedFilter by remember { mutableStateOf("vivid") }
    var brightness by remember { mutableStateOf(0.5f) }
    var contrast by remember { mutableStateOf(0.5f) }
    var saturation by remember { mutableStateOf(0.5f) }
    var sharpness by remember { mutableStateOf(0.5f) }
    val scope = rememberCoroutineScope()

    fun handleProcess() {
        isProcessing = true
        isProcessed = false
        scope.launch {
            delay(2000)
            isProcessing = false
            isProcessed = true
        }
    }

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
            Text(
                "Tools",
                fontSize = 20.sp,
                fontWeight = FontWeight.Bold,
                style = LocalTextStyle.current.copy(
                    brush = Brush.linearGradient(colors = listOf(AccentCyan, AccentPurple))
                )
            )
            Text("Professional AI editing tools", fontSize = 12.sp, color = TextSecondary)
            Spacer(modifier = Modifier.height(12.dp))

            // Sub-feature tabs
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .horizontalScroll(rememberScrollState()),
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                subFeatures.forEach { feat ->
                    val isActive = currentFeature == feat.id
                    Row(
                        modifier = Modifier
                            .clip(RoundedCornerShape(12.dp))
                            .background(
                                if (isActive) Brush.linearGradient(
                                    colors = listOf(AccentCyan, AccentPurple)
                                ) else Brush.linearGradient(
                                    colors = listOf(BgCard, BgCard)
                                )
                            )
                            .then(
                                if (!isActive) Modifier.border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                                else Modifier
                            )
                            .clickable {
                                currentFeature = feat.id
                                isProcessed = false
                                imageUploaded = false
                            }
                            .padding(horizontal = 12.dp, vertical = 6.dp),
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Icon(
                            feat.icon,
                            contentDescription = feat.label,
                            tint = if (isActive) Color.White else TextSecondary,
                            modifier = Modifier.size(12.dp)
                        )
                        Text(
                            feat.label,
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Medium,
                            color = if (isActive) Color.White else TextSecondary
                        )
                    }
                }
            }
        }

        // Content
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = 20.dp)
                .padding(bottom = 16.dp)
        ) {
            when (currentFeature) {
                "enhance" -> EnhanceContent(
                    imageUploaded = imageUploaded,
                    onUpload = { imageUploaded = true; isProcessed = false },
                    isProcessing = isProcessing,
                    isProcessed = isProcessed,
                    brightness = brightness,
                    contrast = contrast,
                    saturation = saturation,
                    sharpness = sharpness,
                    onBrightnessChange = { brightness = it },
                    onContrastChange = { contrast = it },
                    onSaturationChange = { saturation = it },
                    onSharpnessChange = { sharpness = it },
                    onProcess = { handleProcess() }
                )
                "bg-remove" -> BgRemoveContent(
                    imageUploaded = imageUploaded,
                    onUpload = { imageUploaded = true; isProcessed = false },
                    isProcessing = isProcessing,
                    isProcessed = isProcessed,
                    onProcess = { handleProcess() }
                )
                "filters" -> FiltersContent(
                    filters = filters,
                    selectedFilter = selectedFilter,
                    onFilterSelect = { selectedFilter = it },
                    imageUploaded = imageUploaded,
                    onUpload = { imageUploaded = true; isProcessed = false },
                    isProcessing = isProcessing,
                    isProcessed = isProcessed,
                    onProcess = { handleProcess() }
                )
                "object-edit" -> ObjectEditContent(
                    imageUploaded = imageUploaded,
                    onUpload = { imageUploaded = true; isProcessed = false },
                    isProcessing = isProcessing,
                    isProcessed = isProcessed,
                    onProcess = { handleProcess() }
                )
            }
        }
    }
}

@Composable
fun EnhanceContent(
    imageUploaded: Boolean,
    onUpload: () -> Unit,
    isProcessing: Boolean,
    isProcessed: Boolean,
    brightness: Float,
    contrast: Float,
    saturation: Float,
    sharpness: Float,
    onBrightnessChange: (Float) -> Unit,
    onContrastChange: (Float) -> Unit,
    onSaturationChange: (Float) -> Unit,
    onSharpnessChange: (Float) -> Unit,
    onProcess: () -> Unit
) {
    // Info banner
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(Color(0x1A10B981), Color(0x1A06B6D4))
                )
            )
            .border(1.dp, Color(0x4D10B981), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Icon(Icons.Filled.Bolt, contentDescription = null, tint = AccentGreen, modifier = Modifier.size(16.dp))
        Column {
            Text("AI Portrait Enhancer", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = AccentGreen)
            Text("Improve lighting, color, and clarity with one tap", fontSize = 11.sp, color = TextSecondary)
        }
    }
    Spacer(modifier = Modifier.height(16.dp))

    UploadArea(imageUploaded = imageUploaded, onUpload = onUpload, height = 130)
    Spacer(modifier = Modifier.height(16.dp))

    // Quick Enhance
    Text("Quick Enhance", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
    Spacer(modifier = Modifier.height(8.dp))

    val quickTools = listOf(
        Triple(Icons.Filled.AutoFixHigh, "Auto Enhance", AccentPurple),
        Triple(Icons.Filled.Face, "Skin Smooth", AccentPink),
        Triple(Icons.Filled.RemoveRedEye, "Eye Enhance", AccentCyan),
        Triple(Icons.Filled.Brightness7, "Teeth Whiten", AccentGreen),
    )

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        quickTools.take(2).forEach { (icon, name, color) ->
            Row(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(BgCard)
                    .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .background(color.copy(alpha = 0.13f), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null, tint = color, modifier = Modifier.size(18.dp))
                }
                Text(name, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
            }
        }
    }
    Spacer(modifier = Modifier.height(8.dp))
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        quickTools.drop(2).forEach { (icon, name, color) ->
            Row(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(BgCard)
                    .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                    .padding(12.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(36.dp)
                        .background(color.copy(alpha = 0.13f), RoundedCornerShape(10.dp)),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(icon, contentDescription = null, tint = color, modifier = Modifier.size(18.dp))
                }
                Text(name, fontSize = 11.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
            }
        }
    }

    Spacer(modifier = Modifier.height(16.dp))

    // Manual Adjustments
    Text("Manual Adjustments", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
    Spacer(modifier = Modifier.height(8.dp))

    listOf(
        Triple("Brightness", brightness, onBrightnessChange to AccentAmber),
        Triple("Contrast", contrast, onContrastChange to AccentPurple),
        Triple("Saturation", saturation, onSaturationChange to AccentPink),
        Triple("Sharpness", sharpness, onSharpnessChange to AccentCyan),
    ).forEach { (label, value, pair) ->
        val (onChange, color) = pair
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(label, fontSize = 12.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
            Text("${(value * 100).toInt()}", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = color)
        }
        Slider(
            value = value,
            onValueChange = onChange,
            colors = SliderDefaults.colors(
                thumbColor = color,
                activeTrackColor = color,
                inactiveTrackColor = BorderColor
            )
        )
        Spacer(modifier = Modifier.height(4.dp))
    }

    GenerateButton(
        isProcessing = isProcessing,
        onClick = onProcess,
        label = "Enhance Portrait",
        processingLabel = "Enhancing...",
        gradientColors = listOf(AccentGreen, AccentCyan)
    )

    if (isProcessed) {
        Spacer(modifier = Modifier.height(16.dp))
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(AccentGreen.copy(alpha = 0.1f))
                .border(1.dp, AccentGreen.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text("✨ Enhancement Complete!", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = AccentGreen)
                Text("Portrait quality improved by 85%", fontSize = 11.sp, color = TextSecondary)
            }
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                modifier = Modifier.background(
                    Brush.linearGradient(colors = listOf(AccentGreen, AccentCyan)),
                    RoundedCornerShape(8.dp)
                ),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Text("Save", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun BgRemoveContent(
    imageUploaded: Boolean,
    onUpload: () -> Unit,
    isProcessing: Boolean,
    isProcessed: Boolean,
    onProcess: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(Color(0x1AF97316), Color(0x1AEC4899))
                )
            )
            .border(1.dp, Color(0x4DF97316), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Icon(Icons.Filled.ContentCut, contentDescription = null, tint = AccentOrange, modifier = Modifier.size(16.dp))
        Column {
            Text("Background Remover", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = AccentOrange)
            Text("Remove or replace backgrounds with AI precision", fontSize = 11.sp, color = TextSecondary)
        }
    }
    Spacer(modifier = Modifier.height(16.dp))

    UploadArea(imageUploaded = imageUploaded, onUpload = onUpload, height = 140)
    Spacer(modifier = Modifier.height(16.dp))

    Text("Replace Background With", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
    Spacer(modifier = Modifier.height(8.dp))

    val bgOptions = listOf(
        Pair("⬜", "Transparent"),
        Pair("🤍", "White"),
        Pair("🖤", "Black"),
        Pair("🌫️", "Blur"),
        Pair("🏖️", "Beach"),
        Pair("🌆", "City"),
        Pair("🌲", "Forest"),
        Pair("🖼️", "Custom"),
    )

    val rows = bgOptions.chunked(4)
    rows.forEach { row ->
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            row.forEach { (emoji, name) ->
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .background(BgCard)
                        .border(1.dp, BorderColor, RoundedCornerShape(12.dp))
                        .padding(8.dp),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(emoji, fontSize = 20.sp)
                    Text(name, fontSize = 9.sp, color = TextMuted)
                }
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
    }

    // Edge Refinement
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        Text("Edge Refinement", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
        Text("Auto", fontSize = 11.sp, color = AccentOrange)
    }
    Spacer(modifier = Modifier.height(8.dp))

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        listOf("Smooth", "Sharp", "Feather", "Hair").forEachIndexed { index, opt ->
            Box(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(8.dp))
                    .background(if (index == 0) Color(0x33F97316) else BgCard)
                    .border(
                        1.dp,
                        if (index == 0) Color(0x99F97316) else BorderColor,
                        RoundedCornerShape(8.dp)
                    )
                    .padding(vertical = 8.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(opt, fontSize = 10.sp, color = if (index == 0) AccentOrange else TextSecondary)
            }
        }
    }

    Spacer(modifier = Modifier.height(16.dp))
    GenerateButton(
        isProcessing = isProcessing,
        onClick = onProcess,
        label = "Remove Background",
        processingLabel = "Removing Background...",
        gradientColors = listOf(AccentOrange, AccentPink)
    )

    if (isProcessed) {
        Spacer(modifier = Modifier.height(16.dp))
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clip(RoundedCornerShape(16.dp))
                .background(AccentOrange.copy(alpha = 0.1f))
                .border(1.dp, AccentOrange.copy(alpha = 0.3f), RoundedCornerShape(16.dp))
                .padding(16.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Column {
                Text("✂️ Background Removed!", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = AccentOrange)
                Text("Clean cutout ready to download", fontSize = 11.sp, color = TextSecondary)
            }
            Button(
                onClick = {},
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                modifier = Modifier.background(
                    Brush.linearGradient(colors = listOf(AccentOrange, AccentPink)),
                    RoundedCornerShape(8.dp)
                ),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Text("Save PNG", fontSize = 11.sp, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@Composable
fun FiltersContent(
    filters: List<FilterItem>,
    selectedFilter: String,
    onFilterSelect: (String) -> Unit,
    imageUploaded: Boolean,
    onUpload: () -> Unit,
    isProcessing: Boolean,
    isProcessed: Boolean,
    onProcess: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(
                Brush.linearGradient(
                    colors = listOf(Color(0x1A7C3AED), Color(0x1AEC4899))
                )
            )
            .border(1.dp, Color(0x4D7C3AED), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Icon(Icons.Filled.AutoAwesome, contentDescription = null, tint = PurpleLight, modifier = Modifier.size(16.dp))
        Column {
            Text("AI Filters & Effects", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = PurpleLight)
            Text("100+ AI-powered filters to transform your photos", fontSize = 11.sp, color = TextSecondary)
        }
    }
    Spacer(modifier = Modifier.height(16.dp))

    UploadArea(imageUploaded = imageUploaded, onUpload = onUpload, height = 120)
    Spacer(modifier = Modifier.height(16.dp))

    // Filter categories
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .horizontalScroll(rememberScrollState()),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        listOf("All", "Portrait", "Landscape", "Artistic", "Vintage", "Moody").forEachIndexed { index, cat ->
            Box(
                modifier = Modifier
                    .clip(RoundedCornerShape(50))
                    .background(
                        if (index == 0) Brush.linearGradient(colors = listOf(AccentPurple, AccentPink))
                        else Brush.linearGradient(colors = listOf(BgCard, BgCard))
                    )
                    .then(
                        if (index != 0) Modifier.border(1.dp, BorderColor, RoundedCornerShape(50))
                        else Modifier
                    )
                    .padding(horizontal = 12.dp, vertical = 6.dp)
            ) {
                Text(cat, fontSize = 11.sp, fontWeight = FontWeight.Medium, color = if (index == 0) Color.White else TextSecondary)
            }
        }
    }
    Spacer(modifier = Modifier.height(12.dp))

    // Filter grid (3 columns)
    val filterRows = filters.chunked(3)
    filterRows.forEach { row ->
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            row.forEach { filter ->
                val isSelected = selectedFilter == filter.id
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .clip(RoundedCornerShape(12.dp))
                        .border(
                            if (isSelected) 2.dp else 1.dp,
                            if (isSelected) PurpleLight else BorderColor,
                            RoundedCornerShape(12.dp)
                        )
                        .clickable { onFilterSelect(filter.id) }
                ) {
                    Column {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(80.dp)
                                .background(
                                    if (isSelected) Color(0x337C3AED) else BgCard
                                ),
                            contentAlignment = Alignment.Center
                        ) {
                            Text(filter.emoji, fontSize = 28.sp)
                            if (isSelected) {
                                Box(
                                    modifier = Modifier
                                        .align(Alignment.TopEnd)
                                        .padding(4.dp)
                                        .size(20.dp)
                                        .background(PurpleLight, RoundedCornerShape(50)),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(Icons.Filled.Check, contentDescription = null, tint = Color.White, modifier = Modifier.size(10.dp))
                                }
                            }
                        }
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(BgSecondary)
                                .padding(horizontal = 8.dp, vertical = 6.dp),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(filter.name, fontSize = 10.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
                            if (filter.premium) {
                                Text("PRO", fontSize = 8.sp, fontWeight = FontWeight.Bold, color = AccentAmber)
                            }
                        }
                    }
                }
            }
            repeat(3 - row.size) {
                Spacer(modifier = Modifier.weight(1f))
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
    }

    GenerateButton(
        isProcessing = isProcessing,
        onClick = onProcess,
        label = "Apply Filter",
        processingLabel = "Applying Filter..."
    )

    if (isProcessed) {
        Spacer(modifier = Modifier.height(16.dp))
        GeneratedResultCard(
            emoji = "✨",
            title = "Filter Applied!",
            subtitle = "Your filtered photo is ready"
        )
    }
}

@Composable
fun ObjectEditContent(
    imageUploaded: Boolean,
    onUpload: () -> Unit,
    isProcessing: Boolean,
    isProcessed: Boolean,
    onProcess: () -> Unit
) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0x1A06B6D4))
            .border(1.dp, Color(0x4D06B6D4), RoundedCornerShape(16.dp))
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Icon(Icons.Filled.Edit, contentDescription = null, tint = AccentCyan, modifier = Modifier.size(16.dp))
        Column {
            Text("AI Object Editor", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = AccentCyan)
            Text("Remove, replace, or edit objects in your photos", fontSize = 11.sp, color = TextSecondary)
        }
    }
    Spacer(modifier = Modifier.height(16.dp))

    UploadArea(imageUploaded = imageUploaded, onUpload = onUpload)
    Spacer(modifier = Modifier.height(16.dp))

    Text("Edit Mode", fontSize = 13.sp, fontWeight = FontWeight.SemiBold, color = TextPrimary)
    Spacer(modifier = Modifier.height(8.dp))

    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        listOf(
            Triple(Icons.Filled.Delete, "Remove", AccentOrange),
            Triple(Icons.Filled.SwapHoriz, "Replace", AccentPurple),
            Triple(Icons.Filled.Edit, "Edit", AccentCyan),
            Triple(Icons.Filled.Add, "Add", AccentGreen),
        ).forEachIndexed { index, (icon, label, color) ->
            Column(
                modifier = Modifier
                    .weight(1f)
                    .clip(RoundedCornerShape(12.dp))
                    .background(if (index == 0) color.copy(alpha = 0.2f) else BgCard)
                    .border(
                        1.dp,
                        if (index == 0) color.copy(alpha = 0.6f) else BorderColor,
                        RoundedCornerShape(12.dp)
                    )
                    .padding(8.dp),
                horizontalAlignment = Alignment.CenterHorizontally
            ) {
                Icon(icon, contentDescription = null, tint = if (index == 0) color else TextSecondary, modifier = Modifier.size(20.dp))
                Spacer(modifier = Modifier.height(4.dp))
                Text(label, fontSize = 10.sp, color = if (index == 0) color else TextSecondary)
            }
        }
    }

    Spacer(modifier = Modifier.height(16.dp))

    Text("Describe what to edit", fontSize = 13.sp, fontWeight = FontWeight.Medium, color = TextPrimary)
    Spacer(modifier = Modifier.height(8.dp))

    OutlinedTextField(
        value = "",
        onValueChange = {},
        placeholder = { Text("e.g., Remove the background person, Replace sky with sunset...", fontSize = 11.sp, color = TextMuted) },
        modifier = Modifier
            .fillMaxWidth()
            .height(100.dp),
        colors = OutlinedTextFieldDefaults.colors(
            focusedBorderColor = AccentCyan,
            unfocusedBorderColor = BorderColor,
            focusedTextColor = TextPrimary,
            unfocusedTextColor = TextPrimary,
            cursorColor = AccentCyan,
            focusedContainerColor = BgCard,
            unfocusedContainerColor = BgCard
        ),
        shape = RoundedCornerShape(12.dp),
        maxLines = 4
    )

    Spacer(modifier = Modifier.height(16.dp))
    GenerateButton(
        isProcessing = isProcessing,
        onClick = onProcess,
        label = "Apply Edit",
        processingLabel = "Editing...",
        gradientColors = listOf(AccentCyan, AccentPurple)
    )

    if (isProcessed) {
        Spacer(modifier = Modifier.height(16.dp))
        GeneratedResultCard(
            emoji = "✏️",
            title = "Edit Applied!",
            subtitle = "Your edited photo is ready",
            accentColor = AccentCyan
        )
    }
}
