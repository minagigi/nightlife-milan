# claude-plugins

Personal Claude Code plugin marketplace.

## Install

```
/plugin marketplace add minagigi/claude-plugins
/plugin install self-improve@minagigi-tools
```

Works the same way locally (Claude Code CLI) and in cloud sessions
(claude.ai) — once installed, it's available in every project, no
per-repo setup needed.

## Plugins

### self-improve

SkillOpt-style (github.com/microsoft/SkillOpt) self-improvement cycle:
distills session lessons into small, evidence-gated edits to the current
project's instruction files (`CLAUDE.md`/`AGENTS.md`, skills), logged in
`.claude/self-improve/EVOLUTION_LOG.md` inside whatever project it runs in.

Invoke with `/self-improve:self-improve` at the end of a significant task,
or let it trigger automatically based on its skill description (an error
was made and corrected, an external system behaved in an undocumented way,
etc.). See `plugins/self-improve/skills/self-improve/SKILL.md` for the
full protocol.
