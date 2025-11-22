# Standard Form Layout Template

Use this template for all data entry screens.

## Visual Style

### Container
- Padding: 20
- Background: White

### Header
- Font Size: 24
- Weight: Bold
- Margin Bottom: 20
- Color: Black

### Inputs
- Border Width: 1
- Border Color: '#ccc'
- Border Radius: 8
- Padding: 12
- Margin Top: 8
- Margin Bottom: 16
- Font Size: 16

### Labels
- Font Size: 14
- Color: '#333'
- Weight: '600'

### Buttons
- Primary Color: '#007AFF' (Blue)
- Secondary Color: '#34C759' (Green)
- Destructive Color: '#FF3B30' (Red)
- Border Radius: 8
- Padding: 14
- Margin Top: 10

## Example Structure

```tsx
<View style={styles.container}>
  <Text style={styles.header}>{title}</Text>
  
  <Text style={styles.label}>Label</Text>
  <TextInput style={styles.input} />
  
  <Button title="Action" />
</View>
```
