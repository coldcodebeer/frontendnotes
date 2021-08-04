### [Block formatting context](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context)
 - A block formatting context is created by at least one of the following:
   - The root element of the document (<html>).
   - Floats (elements where float isn't none).
   - Absolutely positioned elements (elements where position is absolute or fixed).
   - Inline-blocks (elements with display: inline-block).
   - Block elements where overflow has a value other than visible and clip.
   - display: table-cell | table-caption | table ...
   - Flex items (direct children of the element with display: flex or inline-flex) if they are neither flex nor grid nor table containers themselves.
   - Grid items (direct children of the element with display: grid or inline-grid) if they are neither flex nor grid nor table containers themselves.

  - effects
    - contains internal floats
    - exclude external floats.
    - prevents margins collapsing