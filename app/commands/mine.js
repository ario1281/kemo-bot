import { SlashCommandBuilder } from "discord.js";

// 盤面生成
function generateBoard(rows, cols, freq) {
    // 盤面初期化
    const board = Array.from({ length: rows },
        () => Array(cols).fill(0)
    );

    // 地雷設置
    const bombs = Math.floor(rows * cols * (freq / 100));
    let placed = 0;
    while (placed < bombs) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * cols);

        // 既に地雷がある場合はスキップ
        if (board[r][c] === "B") { continue; }

        board[r][c] = "B";
        placed++;
    }

    // 周囲の地雷数カウント
    const dirs = [
        [-1, -1], [-1, +0], [-1, +1],
        [+0, -1],           [+0, +1],
        [+1, -1], [+1, +0], [+1, +1],
    ];

    // 各マスを走査
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 既に地雷がある場合はスキップ
            if (board[r][c] === "B") { continue; }

            let count = 0;
            for (const [dr, dc] of dirs) {
                // 隣接マスの座標計算
                const nr = r + dr;
                const nc = c + dc;

                // 盤面外チェック
                if (nr < 0 || nr >= rows) { continue; }
                if (nc < 0 || nc >= cols) { continue; }

                board[r][c] = count;
            }
        }
    }

    return board;
}

// 絵文字に変換
function toEmoji(n) {
    return [
        "🟦",
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
        "8️⃣",
        "9️⃣",
    ][n];
}

export default {
    data: new SlashCommandBuilder()
        .setName("mine")
        .setDescription("まいんすいーぱー…？と言うものが出来るらしいのじゃが、妾にはよく分からんのじゃ。")
        .addIntegerOption(option =>
            option.setName("edge")
                .setDescription("一辺のマス　デフォルト:12")
                .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName("freq")
                .setDescription("地雷の頻度　デフォルト:20(%)")
                .setRequired(false)
        ),

    async execute(inter) {
        const edge = inter.options.getInteger("edge") || 12;
        const freq = inter.options.getInteger("freq") || 20;

        // フィールド生成
        const board = generateBoard(edge, edge, freq);
        const msg = board.map(row =>
            row.map(cell =>
                cell === "B"
                    ? "||💣||"
                    : `||${toEmoji(cell)}||`
            ).join("")
        ).join("\n");

        await inter.reply(msg);
    }
};