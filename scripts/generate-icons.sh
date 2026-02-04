#!/bin/bash

# Icon generator script
# Bu skript icon.png dan barcha kerakli o'lchamdagi iconlarni yaratadi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
PUBLIC_DIR="$PROJECT_ROOT/public"
ICON_SOURCE="$PUBLIC_DIR/icon.png"

# Icon o'lchamlari
SIZES=(192 256 384 512)

# Ranglar
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Icon generator skripti${NC}"
echo "================================"

# icon.png mavjudligini tekshirish
if [ ! -f "$ICON_SOURCE" ]; then
    echo -e "${RED}Xato: icon.png fayli topilmadi!${NC}"
    echo "Manzil: $ICON_SOURCE"
    exit 1
fi

echo -e "${GREEN}✓ icon.png topildi${NC}"
echo ""

# Har bir o'lcham uchun icon yaratish
for size in "${SIZES[@]}"; do
    output_file="$PUBLIC_DIR/icon-${size}x${size}.png"
    
    echo -n "Yaratilmoqda: icon-${size}x${size}.png... "
    
    # macOS sips yordamida resize qilish
    if command -v sips &> /dev/null; then
        sips -z "$size" "$size" "$ICON_SOURCE" --out "$output_file" > /dev/null 2>&1
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓${NC}"
        else
            echo -e "${RED}✗${NC}"
        fi
    else
        echo -e "${RED}✗ sips topilmadi (faqat macOS da mavjud)${NC}"
        exit 1
    fi
done

echo ""
echo -e "${GREEN}Barcha iconlar muvaffaqiyatli yaratildi!${NC}"
echo ""
echo "Yaratilgan fayllar:"
for size in "${SIZES[@]}"; do
    output_file="$PUBLIC_DIR/icon-${size}x${size}.png"
    if [ -f "$output_file" ]; then
        file_size=$(ls -lh "$output_file" | awk '{print $5}')
        echo "  - icon-${size}x${size}.png ($file_size)"
    fi
done
